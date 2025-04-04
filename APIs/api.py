from fastapi import FastAPI, UploadFile, File,HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_ollama import OllamaLLM
import tensorflow as tf
import numpy as np
from PIL import Image
import io


# Load the .keras model
potato_model_path = "PotatoModel.keras"  # Path to your .keras file
potato_model = tf.keras.models.load_model(potato_model_path)

blackPepper_model_path = "blackPepperModel.keras"  # Path to your .keras file
blackPepper_model = tf.keras.models.load_model(blackPepper_model_path)

corn_model_path = "cornModel.keras"  # Path to your .keras file
corn_model = tf.keras.models.load_model(corn_model_path)

#Load llm model

## Initialize Ollama LLM
llm = OllamaLLM(model="llama3.2:3b")

## Define a request model
class ChatRequest(BaseModel):
    question: str

## Define a response model
class ChatResponse(BaseModel):
    response: str


# Initialize FastAPI app
app = FastAPI()

# Allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Helper function to preprocess the image
def preprocess_image(image):
    # Convert the image to RGB (if it's not already in RGB format)
    image = image.convert("RGB")
    # Resize image to the input size expected by your model (256x256 based on the signature)
    image = image.resize((256, 256))  # Resize to the model's expected size
    # Convert the image to a NumPy array and normalize (0-1)
    image_array = np.array(image) / 255.0
    # Add a batch dimension (for a single image, the batch size is 1)
    image_array = np.expand_dims(image_array, axis=0)

    return image_array


@app.get("/apitest")
def test_endpoint():
    return {"message": "API is working fine"}


@app.post("/potato_predict")
async def potato_predict(file: UploadFile = File(...)):
    try:
        # Read the image from the uploaded file
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data))

        if not image:
            return JSONResponse(content={"error": "Failed to open image"}, status_code=400)

        # Preprocess the image
        image_array = preprocess_image(image)

        # Make predictions using the model
        predictions = potato_model.predict(image_array)
        print("result: ",predictions)
        # Assuming the model returns the output as a NumPy array
        # Modify the following line based on your model's output format
        max_index = np.argmax(predictions, axis=1)[0]  # Index of the highest probability
        mapping = ["Early_blight", "Late_blight","Healthy"]  # Labels for indices
        mapped_value = mapping[max_index]

        return {"prediction": mapped_value}
    
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
    
    
@app.post("/blackPepper_predict")
async def blackPepper_predict(file: UploadFile = File(...)):
    try:
        # Read the image from the uploaded file
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data))

        if not image:
            return JSONResponse(content={"error": "Failed to open image"}, status_code=400)

        # Preprocess the image
        image_array = preprocess_image(image)

        # Make predictions using the model
        predictions = blackPepper_model.predict(image_array)
        print("result: ",predictions)
        # Assuming the model returns the output as a NumPy array
        # Modify the following line based on your model's output format
        max_index = np.argmax(predictions, axis=1)[0]  # Index of the highest probability
        mapping = ["Pepper_bell_Bacterial_spot", "Pepperbell__healthy"]  # Labels for indices
        mapped_value = mapping[max_index]

        return {"prediction": mapped_value}
    
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
    
    
@app.post("/corn_predict")
async def corn_predict(file: UploadFile = File(...)):
    try:
        # Read the image from the uploaded file
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data))

        if not image:
            return JSONResponse(content={"error": "Failed to open image"}, status_code=400)

        # Preprocess the image
        image_array = preprocess_image(image)

        # Make predictions using the model
        predictions = corn_model.predict(image_array)
        print("result: ",predictions)
        # Assuming the model returns the output as a NumPy array
        # Modify the following line based on your model's output format
        max_index = np.argmax(predictions, axis=1)[0]  # Index of the highest probability
        mapping = ['corn_crisscope','corn_common_rust','corn_healthy','northern_corn_disease']  # Labels for indices
        mapped_value = mapping[max_index]

        return {"prediction": mapped_value}
    
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)




@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    question = request.question.strip()

    if not question:
        raise HTTPException(status_code=400, detail="Question cannot be empty.")

    try:
        # Create the prompt
        prompt = f"""
        You are an expert in agricultural drone services and precision farming. 
        You represent a company that provides agricultural drone services including crop monitoring, 
        precision spraying, field mapping, crop health assessment, and irrigation planning.

        Please provide a detailed technical explanation for this question: {question}

        Your response should:
        1. Focus on drone-based agricultural solutions
        2. Explain how our drone services can help
        3. Include technical details and benefits
        4. Mention practical applications and examples
        5. Emphasize precision agriculture aspects
        
        If the question is not related to agricultural drones or farming, 
        politely redirect the conversation to our drone-based agricultural services.
        """

        # Generate response from Ollama
        # response = llm.invoke(prompt)

        # return {"response": response}
        # Generate response from Ollama
        full_response = llm.invoke(prompt)

        # Split response into words and ensure it's under 100 words
        response_words = full_response.split()

        # Keep only the first 100 words
        truncated_response = " ".join(response_words[:100])

        # Ensure we don't cut off mid-sentence (end at the last full sentence)
        sentences = truncated_response.split('. ')
        if len(sentences) > 1:
            truncated_response = '. '.join(sentences[:-1]) + '.'

        return {"response": truncated_response}


    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=5001)
