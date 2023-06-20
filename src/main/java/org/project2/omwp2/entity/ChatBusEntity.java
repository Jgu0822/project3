package org.project2.omwp2.entity;

import lombok.*;
import org.project2.omwp2.dto.ChatBusInfo;

import javax.persistence.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "chatbus")
public class ChatBusEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "b_id")
    private long bId; // 아이디

    @Column(name = "busRouteAbrv", nullable = false)
    private String busRouteAbrv; // 버스번호

    @Column(name = "stStationNm", nullable = false)
    private String stStationNm; //기점

    @Column(name = "edStationNm", nullable = false)
    private String edStationNm; //종점

    @Column(name = "firstBusTm", nullable = false)
    private String firstBusTm; //첫차시간

    @Column(name = "lastBusTm", nullable = false)
    private String lastBusTm; //막차시간

    @Column(name = "term", nullable = false)
    private String term; //배차간격

    public static ChatBusEntity toChatBusEntity(ChatBusInfo chatBusInfo){

        ChatBusEntity chatBusEntity = new ChatBusEntity();
        chatBusEntity.setBusRouteAbrv(chatBusInfo.getBusRouteAbrv());
        chatBusEntity.setStStationNm(chatBusInfo.getStStationNm());
        chatBusEntity.setEdStationNm(chatBusInfo.getEdStationNm());
        chatBusEntity.setFirstBusTm(chatBusInfo.getFirstBusTm());
        chatBusEntity.setLastBusTm(chatBusInfo.getLastBusTm());
        chatBusEntity.setTerm(chatBusInfo.getTerm());

        return chatBusEntity;
    }
}
