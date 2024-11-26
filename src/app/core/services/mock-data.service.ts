// mock-data.service.ts
import { Injectable } from '@angular/core';

export interface User {
  id: number;
  name: string;
  avatar: string;
  role: string;
}

export interface Post {
  id: number;
  content: string;
  created_at: string;
  likes: number;
  images?: Array<{ path: string; name: string }>;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  private searchHistory: string[] = [
    'Trading Bitcoin',
    'Analyse technique',
    'Stratégie trading',
    'Crypto monnaie',
    'NFT marketplace',
    'DeFi yield farming',
  ];

  private posts: Post[] = [
    {
      id: 1,
      content:
        'Nouvelle analyse du marché #Bitcoin : Les indicateurs techniques suggèrent une forte résistance à 45000$. Surveillez le support à 42000$ pour les prochains mouvements. 📊🚀',
      created_at: new Date(Date.now() - 3600000).toISOString(),
      likes: 24,
      images: [
        {
          path: 'assets/images/bitcoin-chart.jpg',
          name: 'Bitcoin Chart Analysis',
        },
      ],
      user: {
        id: 1,
        name: 'Alex Trader',
        avatar: 'assets/avatars/avatar-1.png',
        role: 'analyst',
      },
    },
    {
      id: 2,
      content:
        "Point marché : L'Ethereum montre des signes de reprise après la correction. Setup intéressant sur le ratio ETH/BTC. Voici mon analyse complète avec les niveaux clés à surveiller 👇",
      created_at: new Date(Date.now() - 7200000).toISOString(),
      likes: 156,
      images: [
        {
          path: 'assets/images/eth-analysis-1.jpg',
          name: 'ETH Analysis 1',
        },
        {
          path: 'assets/images/eth-analysis-2.jpg',
          name: 'ETH Analysis 2',
        },
      ],
      user: {
        id: 2,
        name: 'Sarah Crypto',
        avatar: 'assets/avatars/avatar-2.png',
        role: 'professional',
      },
    },
    {
      id: 3,
      content:
        "Webinaire ce soir à 20h : 'Les fondamentaux du trading'. Je partagerai mes 5 ans d'expérience et mes stratégies les plus efficaces. N'oubliez pas de vous inscrire ! 📚💡",
      created_at: new Date(Date.now() - 86400000).toISOString(),
      likes: 89,
      user: {
        id: 3,
        name: 'Marc Trading Pro',
        avatar: 'assets/avatars/avatar-3.png',
        role: 'educator',
      },
    },
  ];

  getSearchHistory(): string[] {
    return this.searchHistory;
  }

  getPosts(): Post[] {
    return this.posts;
  }

  addToSearchHistory(term: string) {
    if (!this.searchHistory.includes(term)) {
      this.searchHistory.unshift(term);
      if (this.searchHistory.length > 10) {
        this.searchHistory.pop();
      }
    }
  }
}
