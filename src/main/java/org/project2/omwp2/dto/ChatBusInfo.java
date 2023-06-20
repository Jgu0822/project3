package org.project2.omwp2.dto;

import lombok.*;
import org.project2.omwp2.entity.ChatBusEntity;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ChatBusInfo {

    private long bId; // 아이디
    private String busRouteAbrv; // 버스번호
    private String stStationNm; //기점
    private String edStationNm; //종점
    private String firstBusTm; //첫차시간
    private String lastBusTm; //막차시간
    private String term; //배차간격

    public static ChatBusInfo toChatBusInfo(ChatBusEntity chatBusEntity){
        ChatBusInfo chatBusInfo = new ChatBusInfo();
        chatBusInfo.setBId(chatBusEntity.getBId());
        chatBusInfo.setBusRouteAbrv(chatBusInfo.getBusRouteAbrv());
        chatBusInfo.setStStationNm(chatBusEntity.getStStationNm());
        chatBusInfo.setEdStationNm(chatBusEntity.getEdStationNm());
        chatBusInfo.setFirstBusTm(chatBusEntity.getFirstBusTm());
        chatBusInfo.setLastBusTm(chatBusEntity.getLastBusTm());
        chatBusInfo.setTerm(chatBusEntity.getTerm());
        return chatBusInfo;
    }
}
