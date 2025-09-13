
# ⚙️ Oficina de Integração 2 - Controle de Oficina

Este repositório é referente ao trabalho de Oficina de Integração 2 da UTFPR, que teve como tema o Controle de Oficinas para o projeto de extensão ELLP - Ensino Lúdico de Lógica e Programação.



# 🤖 Sobre o ELLP - Ensino Lúdico de Lógica e Programação

O projeto ELLP tem como principal objetivo permitir a crianças e adolescentes de escolas públicas, ONGs e creches tenham acesso ao conhecimento muitas vezes não disponível em suas realidades, apresentando a eles um novo universo, o universitário, pois muitas destas crianças veem a UTFPR como algo inalcançável. Para tal o projeto oferece oficinas presenciais de informática básica, lógica, robótica e programação de computadores, aproveitando estes conteúdos para ofertar reforço escolar das áreas de matemática e ciências.

Tem como público alvo crianças a partir dos 10 anos e adolescentes até os 16 anos, de escolas públicas, ONGs e creches de Cornélio Procópio e região. A comunidade é atendida por meio de oficinas (como se fosse matérias) divididas em aulas realizadas aos sábados, ofertadas na UTFPR em todos os semestres.

Os estudantes da UTFPR-CP participam como voluntários na geração de material, monitoria em oficinas, ministrando oficinas ou na coordenação da execução das ações.



# 📋 Requisitos e Regras de Negócios da Aplicação

Para o projeto, foi selecionado o tema: **Controle de oficinas.**

Esse tema tem como objetivo atender as demandas dos professores, tutores e alunos das oficinas, além dos temas das oficinas e a emissão de certificado para os alunos. Para isso, a aplicação planejada é de um sistema em que os interessados podem acessar para controlar ou visualizar os registros das oficinas, as faltas nas aulas, participantes e por fim emitir o certificado a partir da regra de 75% ou mais de presença nas aulas da oficina. Abaixo está a tabela de requisitos funcionais do sistema:


| ID    | Funcionalidade| Prioridade |
|-------|----------------------------------------------------------------------------------------------------------------------------------------------------------|------------|
| RF-1  | O sistema deve ter 4 tipos de usuários (administrador do sistema, professor, tutor, aluno) | Essencial  |
| RF-2  | O sistema deve ter uma tela de login. | Essencial  |
| RF-3  | O sistema deve ter uma tela de registro. | Essencial  |
| RF-4  | O sistema deve ter uma tela home específica para o usuário, apresentando as funções do sistema correspondentes às suas atribuições. | Importante |
| RF-5  | O sistema deve apresentar na tela home as oficinas vinculadas ao usuário (exceto se for administrador). | Importante |
| RF-6  | O sistema deve apresentar todas as oficinas cadastradas caso o usuário seja administrador. | Importante |
| RF-7  | O sistema deve apresentar na oficina a presença do usuário caso ele seja um aluno da oficina atribuída. | Importante |
| RF-8  | O sistema deve apresentar na oficina um botão para ver o certificado do aluno. | Importante |
| RF-9  | O sistema deve permitir na tela home o professor ou tutor administrar a chamada. | Essencial  |
| RF-10 | O sistema deve ter um botão na tela home que direcione para uma funcionalidade que o professor insira os alunos e tutores na oficina. | Essencial  |
| RF-11 | O sistema deve ter um botão na tela home que direcione para uma funcionalidade que o administrador insira os alunos, tutores e professores na oficina. | Essencial  |
| RF-12 | O sistema deve ter um botão na tela home que o professor realize a conclusão da oficina. | Importante |
| RF-13 | O sistema precisa abrir uma tela de confirmação caso o professor clique no botão de conclusão da oficina. | Essencial  |
| RF-14 | O sistema enviará os certificados caso o professor confirme a conclusão da oficina. | Importante |
| RF-15 | O sistema deve ter um botão na tela home que direcione para uma funcionalidade que o professor ou tutor gerencie a chamada dos alunos. | Essencial  |
| RF-16 | O sistema deve permitir o administrador gerenciar todos os usuários cadastrados. | Essencial  |
| RF-17 | O sistema deve permitir o administrador gerenciar todas as oficinas. | Essencial  |
| RF-18 | O sistema deve permitir o administrador atribuir usuários para professor e tutor a uma oficina. | Essencial  |
| RF-19 | O sistema deve permitir o cadastro de oficina e atribuir um código, nome, descrição e número de aulas previstas. | Essencial  |


# 📐 Arquitetura do Projeto e Tecnologias

Para o desenvolvimento do projeto, foram utilizadas as seguintes tecnologias:

1. 🗄️ **Banco de Dados**
- MySQL

2. 🎨 **Front-End**
- Angular (HTML, CSS, JavaScript)
- Node.js

3. ⚙️ **Back-End**
- Java JDK 17
- Spring Boot

4. 🧪 **Testes Automatizados**
- JUnit & Mockito (Back-End)
- Jasmine (Front-End)
- GitHub Actions (CI/CD)

5. 💻 **IDEs**
- IntelliJ IDEA → Back-End
- VS Code → Front-End

6. 📦 **Build & Dependências**
- Maven (Java)
- npm (Node/Angular)

7. 🔄 **Versionamento**
- Git & GitHub

8. 📑 **Documentação**
- Swagger (OpenAPI)
- Jira

Com a definição das tecnologias e ferramentas utilizadas no projeto, foi possível estruturar a arquitetura do sistema de forma organizada. O diagrama a seguir ilustra a interação do cliente com o sistema: o cliente realiza requisições HTTP para o Front-End (Angular/Node.js), que encaminha essas requisições ao Back-End utilizando autenticação JWT para garantir segurança e autorização. No Back-End, a API processa as requisições através das três camadas principais: Controller, que recebe e valida os dados; Service, que contém a lógica de negócio e processa as informações conforme as regras do sistema; e Repository, que realiza a persistência dos dados no Banco de Dados (MySQL). 

Após o processamento, a resposta é retornada do Back-End para o Front-End, que a apresenta ao cliente, finalizando o fluxo de comunicação. Dessa forma, o diagrama evidencia a arquitetura completa do projeto, mostrando como cada tecnologia e camada se conecta para garantir segurança, integridade dos dados e eficiência no funcionamento do sistema.

![Diagrama da Arquitetura](https://raw.githubusercontent.com/Jackoki/trabalho-oficina-integracao/refs/heads/main/readme_images/Diagrama%20da%20Arquitetura.jpeg)

# 🧪 Definição da Estratégia de Automação de Testes do Sistema 
A estratégia de automação de testes foi definida para garantir a qualidade e integridade do sistema em todas as camadas. No Back-End, utilizamos JUnit e Mockito para testes unitários e de integração, enquanto no Front-End, os testes são realizados com Jasmine. Além disso, todas as execuções de testes são integradas ao GitHub Actions (CI/CD), permitindo que sejam executadas automaticamente a cada alteração no código, garantindo detecção rápida de erros e regressões.

# ⌛ Cronograma
Como dito no tópico de tecnologias, para a organização do cronograma e acompanhamento do desenvolvimento pela equipe, foi aplicado a metodologia ágil com o Scrum pelo Jira que contém a possibilidade do uso do Kanban, dividindo as entregas e desenvolvimento por sprints de 2 a 3 semanas cada.

![Cronograma do Jira](https://raw.githubusercontent.com/Jackoki/trabalho-oficina-integracao/refs/heads/main/readme_images/Backlog%20Jira.png)
![Quadros do Jira](https://raw.githubusercontent.com/Jackoki/trabalho-oficina-integracao/refs/heads/main/readme_images/Quadro%20Jira.png)


# 🔨 Outras Ferramentas, Diagramas ou Informações
- [Diagrama de Caso de Uso](https://raw.githubusercontent.com/Jackoki/trabalho-oficina-integracao/refs/heads/main/readme_images/Diagrama%20de%20Caso%20de%20Uso.jpeg)
- [Diagrama de Banco de Dados](https://raw.githubusercontent.com/Jackoki/trabalho-oficina-integracao/refs/heads/main/readme_images/Diagrama%20de%20BD.jpeg)
- [Protótipo do Figma](https://www.figma.com/design/ezQXoiHVso6OpqDL2PMmJZ/Oficina-de-Integra%C3%A7%C3%A3o---Prot%C3%B3tipo-Oficinas?node-id=0-1&p=f&t=CfRI0XLL6l3HAgAm-0)

# 🚀 Como Executar

Para rodar o sistema em sua máquina Windows, é necessário ter instalado:

- Git  
- Node.js (20+)  
- Maven (3.8+)  
- MySQL (8+)  
- Java JDK 17  

```bash
git clone https://github.com/Jackoki/trabalho-oficina-integracao.git
cd trabalho-oficina-integracao
```

Antes de rodar o backend, é necessário ajustar as configurações do banco de dados no arquivo application.properties, que fica dentro da pasta backend/src/main/resources:
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/seu_banco
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```

Após isso, na parte de backend, instale as dependências:
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

A API estará disponível em: http://localhost:8080
Para os testes do back-end, rode: mvn test



Agora instela as dependências do frontend:
```bash
cd frontend
npm install
ng serve
```
O frontend estará disponível em: http://localhost:4200
Para os testes do front-end rode npm test


