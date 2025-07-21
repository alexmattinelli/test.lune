from transformers import AutoModelForCausalLM, AutoTokenizer
import gradio as gr

model_path = "./meu_modelo_treinado"
tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForCausalLM.from_pretrained(model_path)

def generate_text(prompt):
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=100)
    return tokenizer.decode(outputs[0], skip_special_tokens=True)

interface = gr.Interface(
    fn=generate_text,
    inputs=gr.Textbox(lines=2, placeholder="Digite seu prompt..."),
    outputs="text",
    title="IA com Linguagem Neutra",
    examples=["Como usar linguagem neutra?", "Elu é..."]
)

interface.launch()