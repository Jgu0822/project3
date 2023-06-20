package org.project2.omwp2.chatbot.repository;

import org.project2.omwp2.entity.ChatWeatherEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatWeatherRepository extends JpaRepository<ChatWeatherEntity, Long> {

    Optional<ChatWeatherEntity> findByCityVal(String cityVal);
}
