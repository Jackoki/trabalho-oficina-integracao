package com.projeto_oficina2.backend.service;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.awt.FontMetrics;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto_oficina2.backend.model.FrequenciesStudents;
import com.projeto_oficina2.backend.model.User;
import com.projeto_oficina2.backend.model.Workshops;
import com.projeto_oficina2.backend.repository.UserRepository;
import com.projeto_oficina2.backend.repository.WorkshopsRepository;
import com.projeto_oficina2.backend.repository.FrequenciesStudentsRepository;

@Service
public class CertificateService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WorkshopsRepository workshopsRepository;

    @Autowired
    private FrequenciesStudentsRepository frequenciesStudentsRepository;


    public byte[] generateCertificate(Long userId, Long workshopId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Workshops workshop = workshopsRepository.findById(workshopId)
                .orElseThrow(() -> new RuntimeException("Oficina não encontrada"));

        FrequenciesStudents fs = frequenciesStudentsRepository
                .findByUserAndWorkshop(user, workshop)
                .orElseThrow(() -> new RuntimeException("Nenhum registro de frequência encontrado para este aluno."));

        long totalAulas = workshop.getClasses() != null ? workshop.getClasses().size() : 0;

        if (totalAulas == 0) {
            throw new RuntimeException("Esta oficina ainda não possui aulas cadastradas. Certificado indisponível.");
        }

        long feitas = Math.round((fs.getFrequency() / 100.0) * totalAulas);

        if (fs.getFrequency() < 75.0) {
            throw new RuntimeException("Certificado não disponível. O aluno possui menos de 75% de presença.");
        }

        if (feitas < totalAulas) {
            throw new RuntimeException("Certificado não disponível. O aluno ainda não concluiu todas as aulas.");
        }

        if (workshop.getIsFinished() == 0) {
            throw new RuntimeException("Certificado não disponível. A oficina não foi finalizada ainda!.");
        }

        try (InputStream input = getClass().getResourceAsStream("/FundoCertificado.png")) {

            if (input == null) {
                throw new RuntimeException("Imagem base do certificado não encontrada em /FundoCertificado.png");
            }

            BufferedImage base = ImageIO.read(input);
            if (base == null) {
                throw new RuntimeException("Não foi possível ler a imagem base do certificado.");
            }

           Graphics2D g = base.createGraphics();

            try {
                g.setColor(Color.BLACK);

                Font fonteTitulo = new Font("Arial", Font.BOLD, 60);
                g.setFont(fonteTitulo);
                FontMetrics fmTitulo = g.getFontMetrics(fonteTitulo);

                String titulo = "CERTIFICADO DE CONCLUSÃO";

                Font fonteTexto = new Font("Arial", Font.PLAIN, 32);
                g.setFont(fonteTexto);
                FontMetrics fmTexto = g.getFontMetrics(fonteTexto);

                String texto = String.format(
                    "Certificamos que o ALUNO - %s, CÓDIGO - %s, participou da OFICINA - %s %s, promovida pela ELLP - Ensino Lúdico de Lógica de Programação, com a realização de %d/%d aulas.",
                    safeString(user.getName()),
                    safeString(user.getCode()),
                    safeString(workshop.getName()),
                    safeString(workshop.getCode()),
                    feitas,
                    totalAulas
                );

                int maxWidth = base.getWidth() - 200;

                List<String> linhas = new ArrayList<>();
                String[] palavras = texto.split(" ");
                StringBuilder linhaAtual = new StringBuilder();

                for (String palavra : palavras) {
                    String teste = linhaAtual + palavra + " ";
                    if (fmTexto.stringWidth(teste) > maxWidth) {
                        linhas.add(linhaAtual.toString().trim());
                        linhaAtual = new StringBuilder(palavra + " ");
                    } 
                    else {
                        linhaAtual.append(palavra).append(" ");
                    }
                }

                if (linhaAtual.length() > 0) linhas.add(linhaAtual.toString().trim());

                int tituloHeight = fmTitulo.getHeight();
                int textoHeight = linhas.size() * fmTexto.getHeight();
                int espacamentoEntreTituloETexto = 60;

                int alturaTotal = tituloHeight + espacamentoEntreTituloETexto + textoHeight;

                int startY = (base.getHeight() - alturaTotal) / 2;

                g.setFont(fonteTitulo);
                int tituloX = (base.getWidth() - fmTitulo.stringWidth(titulo)) / 2;
                int tituloY = startY + tituloHeight;

                g.drawString(titulo, tituloX, tituloY);

                int y = tituloY + espacamentoEntreTituloETexto;
                g.setFont(fonteTexto);

                for (String linha : linhas) {
                    int x = (base.getWidth() - fmTexto.stringWidth(linha)) / 2;
                    g.drawString(linha, x, y);
                    y += fmTexto.getHeight();
                }
            } 

            finally {
                g.dispose();
            }

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(base, "png", baos);
            return baos.toByteArray();

        } 
        
        catch (Exception e) {
            throw new RuntimeException("Erro ao gerar certificado: " + e.getMessage(), e);
        }
    }

    private String safeString(Object o) {
        return o == null ? "" : o.toString();
    }
}
