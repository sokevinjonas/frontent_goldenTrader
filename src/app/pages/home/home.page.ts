import { Component, OnInit } from '@angular/core';
interface Post {
  id: number;
  author: string;
  avatar: string;
  title: string;
  content: string;
  image?: string;
  likes: number;
  dislikes: number;
  isFollowed: boolean;
  timestamp: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  posts: Post[] = [
    {
      id: 1,
      author: 'Alex Trading Pro',
      avatar: 'assets/avatars/avatar-man.png',
      title: 'Analyse BTC/USD',
      content:
        "Signal d'achat sur Bitcoin : support crucial à 62000$, RSI en zone de survente. Objectif : 68000$ 🎯",
      image: 'https://placehold.co/800x450',
      likes: 245,
      dislikes: 12,
      isFollowed: false,
      timestamp: 'Il y a 2h',
    },
    {
      id: 2,
      author: 'CryptoSage',
      avatar: 'assets/avatars/avatar-man.png',
      title: 'ETH breakout imminent',
      content:
        'Ethereum montre des signes de cassure haussière. Niveau clé à surveiller : 3200$ 📈',
      likes: 189,
      dislikes: 8,
      isFollowed: true,
      timestamp: 'Il y a 3h',
    },
  ];

  currentUser = {
    name: 'Thomas',
    isNewUser: true,
  };
  constructor() {}

  ngOnInit() {}
  toggleFollow(post: Post) {
    post.isFollowed = !post.isFollowed;
  }

  handleLike(post: Post, isLike: boolean) {
    if (isLike) {
      post.likes++;
    } else {
      post.dislikes++;
    }
  }
}
