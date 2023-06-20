package org.project2.omwp2.entity;

import lombok.*;
import org.project2.omwp2.dto.ChatWeatherInfo;

import javax.persistence.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "chatweather")
public class ChatWeatherEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "w_id")
    private long wId; // 아이디
    
    @Column(name = "city_val", nullable = false)
    private String cityVal; // 도시 이름

    @Column(name = "humidity", nullable = false)
    private String humidity; // 습도

    @Column(name = "wind", nullable = false)
    private String wind; // 바람

    @Column(name = "cloud", nullable = false)
    private String cloud; // 구름

    @Column(name = "temp_min", nullable = false)
    private String temp_min; // 최저온도

    @Column(name = "temp_max", nullable = false)
    private String temp_max; // 최고온도

    @Column(name = "temp", nullable = false)
    private String temp; // 현재온도

    @Column(name = "weather_description", nullable = false)
    private String weather_description; // 현재 날씨 상태

    public static ChatWeatherEntity toChatWeatherEntity(ChatWeatherInfo chatWeatherInfo){

        ChatWeatherEntity chatWeatherEntity = new ChatWeatherEntity();
        chatWeatherEntity.setCityVal(chatWeatherInfo.getCityVal());
        chatWeatherEntity.setHumidity(chatWeatherInfo.getHumidity());
        chatWeatherEntity.setWind(chatWeatherInfo.getWind());
        chatWeatherEntity.setCloud(chatWeatherInfo.getCloud());
        chatWeatherEntity.setTemp_min(chatWeatherInfo.getTemp_min());
        chatWeatherEntity.setTemp_max(chatWeatherInfo.getTemp_max());
        chatWeatherEntity.setTemp(chatWeatherInfo.getTemp());
        chatWeatherEntity.setWeather_description(chatWeatherInfo.getWeather_description());
        return chatWeatherEntity;
    }

}
