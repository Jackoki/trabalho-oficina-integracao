package com.projeto_oficina2.backend.service;

import com.projeto_oficina2.backend.dto.RollCallRequest;
import com.projeto_oficina2.backend.model.*;
import com.projeto_oficina2.backend.repository.FrequenciesRepository;
import com.projeto_oficina2.backend.repository.FrequenciesStudentsRepository;
import com.projeto_oficina2.backend.repository.ClassesRepository;
import com.projeto_oficina2.backend.repository.WorkshopsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FrequenciesService {

    private final FrequenciesRepository frequenciesRepository;
    private final FrequenciesStudentsRepository frequenciesStudentsRepository;
    private final ClassesRepository classesRepository;
    private final WorkshopsRepository workshopsRepository;

    public FrequenciesService(FrequenciesRepository frequenciesRepository, FrequenciesStudentsRepository frequenciesStudentsRepository, ClassesRepository classesRepository, WorkshopsRepository workshopsRepository) {
        this.frequenciesRepository = frequenciesRepository;
        this.frequenciesStudentsRepository = frequenciesStudentsRepository;
        this.classesRepository = classesRepository;
        this.workshopsRepository = workshopsRepository;
    }

    @Transactional
    public Frequencies saveOrUpdateFrequency(Long classId, Long userId, Boolean isPresent) {
        Classes clazz = classesRepository.findById(classId).orElseThrow(() -> new RuntimeException("Classe não encontrada"));

        User user = clazz.getWorkshop().getUsers().stream().filter(u -> u.getId().equals(userId)).findFirst().orElseThrow(() -> new RuntimeException("Usuário não encontrado neste workshop"));

        Frequencies frequency = frequenciesRepository.findByClassesAndUser(clazz, user).orElse(new Frequencies());

        frequency.setClasses(clazz);
        frequency.setUser(user);
        frequency.setIsPresent(isPresent);

        frequenciesRepository.save(frequency);

        updateFrequenciesStudents(user, clazz.getWorkshop());

        return frequency;
    }

    @Transactional
    public void saveRollCall(Long classId, List<RollCallRequest> attendances) {
        Classes classeAtual = classesRepository.findById(classId).orElseThrow(() -> new RuntimeException("Aula não encontrada"));

        Workshops workshop = classeAtual.getWorkshop();

        for (RollCallRequest attendance : attendances) {
            User user = workshop.getUsers().stream()
                    .filter(u -> u.getId().equals(attendance.getUserId()))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException(
                            "Usuário " + attendance.getUserId() + " não pertence a este workshop"
                    ));

            Frequencies freq = frequenciesRepository.findByClassesAndUser(classeAtual, user).orElse(new Frequencies());

            freq.setClasses(classeAtual);
            freq.setUser(user);
            freq.setIsPresent(attendance.getIsPresent());

            frequenciesRepository.save(freq);

            updateFrequenciesStudents(user, workshop);
        }
    }


    @Transactional
    public void updateFrequenciesStudents(User user, Workshops workshop) {
        List<Frequencies> userFrequencies = frequenciesRepository.findByWorkshopAndUser(workshop, user);

        long attendedClasses = userFrequencies.stream().filter(Frequencies::getIsPresent).count();

        long totalClasses = workshop.getClasses() != null ? workshop.getClasses().size() : 0;

        double frequencyPercent = totalClasses == 0 ? 0 : ((double) attendedClasses / totalClasses) * 100;

        FrequenciesStudents fs = frequenciesStudentsRepository.findByUserAndWorkshop(user, workshop).orElse(new FrequenciesStudents());

        fs.setUser(user);
        fs.setWorkshop(workshop);
        fs.setFrequency(frequencyPercent);
        fs.setIsApproved(frequencyPercent >= 75);

        frequenciesStudentsRepository.save(fs);
    }

    public List<Frequencies> findByClass(Long classId) {
        Classes clazz = classesRepository.findById(classId).orElseThrow(() -> new RuntimeException("Classe não encontrada"));
        return frequenciesRepository.findByClasses(clazz);
    }

    @Transactional
    public void delete(Long frequencyId) {
        Frequencies frequency = frequenciesRepository.findById(frequencyId).orElseThrow(() -> new RuntimeException("Frequência não encontrada"));
        frequenciesRepository.delete(frequency);

        updateFrequenciesStudents(frequency.getUser(), frequency.getClasses().getWorkshop());
    }
    
}
