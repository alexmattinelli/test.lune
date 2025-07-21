# -*- coding: utf-8 -*-
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    TrainingArguments,
    Trainer
)
from datasets import load_dataset
from peft import LoraConfig, get_peft_model
import torch

# Configurações
MODEL_NAME = "mistralai/Mistral-7B-v0.1"  # Modelo gratuito
DATA_PATH = "./dados/textos_customizados.txt"  # Seus dados aqui

# Carrega modelo e tokenizador
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,
    device_map="auto",
    torch_dtype=torch.float16
)

# Carrega dados (formato: 1 frase por linha)
dataset = load_dataset("text", data_files=DATA_PATH, split="train")

# Configura LoRA
lora_config = LoraConfig.from_pretrained("./config_lora.json")
model = get_peft_model(model, lora_config)

# Treinamento
training_args = TrainingArguments(
    output_dir="./meu_modelo_treinado",
    per_device_train_batch_size=2,
    gradient_accumulation_steps=4,
    num_train_epochs=1,
    save_steps=100,
    logging_steps=10,
    learning_rate=2e-4,
    fp16=True
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset,
    tokenizer=tokenizer
)

print("Iniciando treino...")
trainer.train()
model.save_pretrained("./meu_modelo_treinado")