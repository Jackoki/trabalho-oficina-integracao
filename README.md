
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

