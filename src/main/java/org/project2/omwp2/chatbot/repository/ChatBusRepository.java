package org.project2.omwp2.chatbot.repository;

import org.project2.omwp2.entity.ChatBusEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatBusRepository extends JpaRepository<ChatBusEntity, Long> {

    Optional<ChatBusEntity> findByBusRouteAbrv(String busRouteAbrv);
}
