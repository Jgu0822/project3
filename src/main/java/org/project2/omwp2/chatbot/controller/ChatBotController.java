package org.project2.omwp2.chatbot.controller;

import lombok.Builder;
import net.minidev.json.parser.ParseException;
import org.project2.omwp2.chatbot.repository.ChatBusRepository;
import org.project2.omwp2.chatbot.repository.ChatWeatherRepository;
import org.project2.omwp2.chatbot.service.KomoranService;
import org.project2.omwp2.dto.ChatBusInfo;
import org.project2.omwp2.dto.ChatWeatherInfo;
import org.project2.omwp2.entity.ChatBusEntity;
import org.project2.omwp2.entity.ChatWeatherEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@Builder
public class ChatBotController {

  @Autowired
  private KomoranService komoranService;

  @Autowired
  private ChatWeatherRepository chatWeatherRepository;

  @Autowired
  private ChatBusRepository chatBusRepository;

  @PostMapping("/botController")
  public String message(String message, Model model) throws Exception {

    model.addAttribute("msg", komoranService.nlpAnalyze(message));

    return "chatbot/bot-message";
  }

//  api 요청 처리
  @PostMapping("/chatweather")
  public @ResponseBody ChatWeatherInfo getWeatherInfo(@RequestBody ChatWeatherInfo weatherData) throws ParseException {

    System.out.println(weatherData.getCityVal());
    System.out.println(weatherData.getWeather_description());
    System.out.println(weatherData.getHumidity());
    System.out.println(weatherData.getTemp());
    System.out.println(weatherData.getCityVal());

//  DB에 저장
//  해당 도시 데이터가 이미 있을 경우 그 데이터를 반환
    String city = weatherData.getCityVal();

    if(chatWeatherRepository.findByCityVal(city).isPresent()){
      System.out.println("이미 존재하는 도시입니다. ");
      return ChatWeatherInfo.toChatWeatherInfo(chatWeatherRepository.findByCityVal(city).get());
    }

//   기존에 없는 도시 데이터일 경우 저장하여 반환

    ChatWeatherEntity chatWeatherEntity = new ChatWeatherEntity();

    chatWeatherEntity.setCityVal(weatherData.getCityVal());
    chatWeatherEntity.setWind(weatherData.getWind());
    chatWeatherEntity.setHumidity(weatherData.getHumidity());
    chatWeatherEntity.setCloud(weatherData.getCloud());
    chatWeatherEntity.setTemp(weatherData.getTemp());
    chatWeatherEntity.setTemp_max(weatherData.getTemp_max());
    chatWeatherEntity.setTemp_min(weatherData.getTemp_min());
    chatWeatherEntity.setWeather_description(weatherData.getWeather_description());

    chatWeatherRepository.save(chatWeatherEntity);

    return ChatWeatherInfo.toChatWeatherInfo(chatWeatherEntity);

  }

  @PostMapping("/chatBus")
  public @ResponseBody ChatBusInfo getBusInfo(@RequestBody ChatBusInfo busData) throws ParseException{

    System.out.println(busData.getBusRouteAbrv());

    String bus = busData.getBusRouteAbrv();

    if (chatBusRepository.findByBusRouteAbrv(bus).isPresent()){
      System.out.println("이미 존재하는 버스입니다. ");
      return ChatBusInfo.toChatBusInfo(chatBusRepository.findByBusRouteAbrv(bus).get());
    }

    ChatBusEntity chatBusEntity = new ChatBusEntity();
    chatBusEntity.setBusRouteAbrv(busData.getBusRouteAbrv());
    chatBusEntity.setStStationNm(busData.getStStationNm());
    chatBusEntity.setEdStationNm(busData.getEdStationNm());
    chatBusEntity.setFirstBusTm(busData.getFirstBusTm());
    chatBusEntity.setLastBusTm(busData.getLastBusTm());
    chatBusEntity.setTerm(busData.getTerm());

    chatBusRepository.save(chatBusEntity);

    return ChatBusInfo.toChatBusInfo(chatBusEntity);
  }

}
