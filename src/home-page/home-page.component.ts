import { Component, inject } from '@angular/core';
import { IAdvantage } from '../interfaces/IAdvantage';
import { IDestination } from '../interfaces/IDestination';
import { IArticle } from '../interfaces/IArticle';
import { IPhoto } from '../interfaces/IPhoto';
import { MessageService } from '../services/message.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

  messageService: MessageService = inject(MessageService);

  selectedLocation: string = '';
  selectedDate: string = '';
  selectedParticipants: string = '';
  liveText: string = '';
  advantages: IAdvantage[] = [
    {
      id: 1,
      icon: 'guide',
      title: 'Опытный гид',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      id: 2,
      icon: 'safety',
      title: 'Безопасный поход',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      id: 3,
      icon: 'price',
      title: 'Лояльные цены',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
  ];
  offerImages: string[] = [
    'offer-lake',
    'offer-hiker',
    'offer-snowmobile',
    'offer-valley',
  ];
  destinations: IDestination[] = [
    {
      id: 1,
      title: 'Озеро возле гор',
      subtitle: 'романтическое приключение',
      image: 'destination-lake',
      price: 480,
      rating: 4.9,
    },
    {
      id: 2,
      title: 'Ночь в горах',
      subtitle: 'в компании друзей',
      image: 'destination-night',
      price: 500,
      rating: 4.5,
    },
    {
      id: 3,
      title: 'Растяжка в горах',
      subtitle: 'для тех, кто заботится о себе',
      image: 'destination-stretching',
      price: 230,
      rating: 5.0,
    },
  ];

  articles: IArticle[] = [
    {
      id: 1,
      title: 'Красивая Италия, какая она в реальности?',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      image: 'blog-italy',
      date: '01/04/2023',
    },
    {
      id: 2,
      title: 'Долой сомнения! Весь мир открыт для вас!',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
      image: 'blog-flight',
      date: '01/04/2023',
    },
    {
      id: 3,
      title: 'Как подготовиться к путешествию в одиночку?',
      description:
        'Для современного мира базовый вектор развития предполагает.',
      image: 'blog-solo',
      date: '01/04/2023',
    },
    {
      id: 4,
      title: 'Индия ... летим?',
      description: 'Для современного мира базовый.',
      image: 'blog-india',
      date: '01/04/2023',
    },
  ];
  photos: IPhoto[] = [
    {
      id: 1,
      image: 'gallery-balloons',
      alt: 'Путешественники на фоне воздушных шаров',
    },
    {
      id: 2,
      image: 'gallery-map',
      alt: 'Карта и фотоаппарат для путешествия',
    },
    {
      id: 3,
      image: 'gallery-hotel',
      alt: 'Отель в форме паруса у моря',
    },
    {
      id: 4,
      image: 'gallery-beach',
      alt: 'Пляж с лодками у берега',
    },
    {
      id: 5,
      image: 'gallery-canyon',
      alt: 'Путешественница на фоне каньона',
    },
    {
      id: 6,
      image: 'gallery-travel',
      alt: 'Блокнот, карта и фотоаппарат',
    },
  ];

}