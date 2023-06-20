package org.project2.omwp2.dto;

import lombok.*;
import org.project2.omwp2.entity.ChatWeatherEntity;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ChatWeatherInfo {


    private Long wId; // 아이디
    private String cityVal; // 도시 이름
    private String humidity; // 습도
    private String wind; // 바람
    private String cloud; // 구름
    private String temp_min; // 최저온도
    private String temp_max; // 최고온도
    private String temp; // 현재온도
    private String weather_description; // 현재 날씨 상태

    public static ChatWeatherInfo toChatWeatherInfo(ChatWeatherEntity chatWeatherEntity){
        ChatWeatherInfo chatWeatherInfo = new ChatWeatherInfo();
        chatWeatherInfo.setWId(chatWeatherEntity.getWId());
        chatWeatherInfo.setCityVal(chatWeatherEntity.getCityVal());
        chatWeatherInfo.setHumidity(chatWeatherEntity.getHumidity());
        chatWeatherInfo.setWind(chatWeatherEntity.getWind());
        chatWeatherInfo.setCloud(chatWeatherEntity.getCloud());
        chatWeatherInfo.setTemp_min(chatWeatherEntity.getTemp_min());
        chatWeatherInfo.setTemp_max(chatWeatherEntity.getTemp_max());
        chatWeatherInfo.setTemp(chatWeatherEntity.getTemp());
        chatWeatherInfo.setWeather_description(chatWeatherEntity.getWeather_description());
        return chatWeatherInfo;
    }
}
