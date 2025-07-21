from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

model_path = "./meu_modelo_treinado"
tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForCausalLM.from_pretrained(
    model_path,
    device_map="auto",
    torch_dtype=torch.float16
)

while True:
    prompt = input("\nDigite um prompt (ou 'sair'): ")
    if prompt.lower() == "sair":
        break
    
    inputs = tokenizer(prompt, return_tensors="pt").to("cuda")
    outputs = model.generate(
        **inputs,
        max_length=100,
        temperature=0.7
    )
    print("\nResposta:")
    print(tokenizer.decode(outputs[0], skip_special_tokens=True))