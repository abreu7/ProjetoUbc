
# **📚 API para gerenciar estudantes**  
**API RESTful para gerenciamento de estudantes usando .NET 6 e Oracle**  

---

## 📌 **Descrição**  
Este projeto é uma API REST desenvolvida em **.NET 6** para gerenciar informações de estudantes. A API permite **listar, criar, atualizar e excluir estudantes**, além de implementar **autenticação JWT** para segurança.  

O banco de dados utilizado é **Oracle** e a API segue as **melhores práticas** do .NET, incluindo **injeção de dependência, SOLID e uso do `IOptions<T>` para configurações seguras**.

---

## 🚀 **Funcionalidades**
✅ **CRUD de Estudantes**  
✅ **Autenticação JWT**  
✅ **Banco de Dados Oracle**  
✅ **Padrão SOLID e Injeção de Dependência**  
✅ **Uso do `IOptions<T>` para configuração segura do JWT**  
✅ **Suporte a Swagger para documentação**  

---

## 💻 **Como Executar o Projeto**

### **1️⃣ Pré-requisitos**
Antes de rodar o projeto, certifique-se de ter instalado:
- [.NET 6 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)
- [Docker](https://docs.docker.com/get-started/get-docker/?_gl=1*dhbcrw*_gcl_au*MjEwMDg1OTE2OC4xNzM4MjY2ODQ0*_ga*MTQzMzkxOTU2MC4xNzM4MjY2ODQ1*_ga_XJWPQMJYHQ*MTczOTA0MjMzNy43LjEuMTczOTA0MzY2Mi4zOC4wLjA.)

---

### **2️⃣ Restaurar Dependências**
Navegue até a pasta UbcApi e no terminal, execute:
```sh
dotnet restore
```

---

### **3️⃣ Executar a Aplicação**
Inicie o servidor com:
```sh
dotnet run
```
Se tudo estiver correto, a API estará rodando em:  
📌 **`https://localhost:7090`** (ou `http://localhost:5249` para HTTP).

---

### **4️⃣ Configurar conexão com o Banco**
Para facilitar a interação com o banco, foi criado um repositório para ser utilizado.
Este repositório contém uma **imagem Docker** do **Oracle Database**, já configurada com tabelas e dados iniciais de estudantes.  

## **🚀 Como Usar**  

### **1️⃣ Baixar a Imagem**    
```bash
docker pull urias967/ubc-oracle-db:v2
```

### **2️⃣ Rodar o Container**  
```bash
docker run -d --name oracle-db -p 1521:1521 urias967/ubc-oracle-db:v2
```
Isso inicia o banco e o deixa pronto para conexões.  

---

### 🔑 Credenciais de Teste
Para acessar a aplicação, utilize as seguintes credenciais de teste:

```bash
📝 Usuário: admin  
🔒 Senha: admin123
```

---

## 📜 **Licença**
Este projeto está licenciado sob a **MIT License**.  
