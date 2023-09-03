from transformers import PegasusForConditionalGeneration

# Model name or path
model_name = "human-centered-summarization/financial-summarization-pegasus"

# Load the model
model = PegasusForConditionalGeneration.from_pretrained(model_name)

# Save the model to a local directory
model.save_pretrained("Model")
