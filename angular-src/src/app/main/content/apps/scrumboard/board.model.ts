import { FuseUtils } from '@fuse/utils';

import { List } from './list.model';
import { Card } from './card.model';

const sampleLabels = [
    {
        'id'   : '56027e4119ad3a5dc28b36cd',
        'name' : 'Design',
        'color': 'mat-red-500-bg'
    },
    {
        'id'   : '5640635e19ad3a5dc21416b2',
        'name' : 'App',
        'color': 'mat-blue-500-bg'
    },
    {
        'id'   : '6540635g19ad3s5dc31412b2',
        'name' : 'Feature',
        'color': 'mat-green-400-bg'
    }
];

const sampleMembers = [
    {
        id    : '56027c1930450d8bf7b10758',
        name  : 'Alice Freeman',
        avatar: 'assets/images/avatars/alice.jpg'
    },
    {
        id    : '26027s1930450d8bf7b10828',
        name  : 'Danielle Obrien',
        avatar: 'assets/images/avatars/danielle.jpg'
    },
    {
        id    : '76027g1930450d8bf7b10958',
        name  : 'James Lewis',
        avatar: 'assets/images/avatars/james.jpg'
    },
    {
        id    : '36027j1930450d8bf7b10158',
        name  : 'Vincent Munoz',
        avatar: 'assets/images/avatars/vincent.jpg'
    }
];

export class Board
{
    name: string;
    uri: string;
    id: string;
    settings: {
        color: string,
        subscribed: boolean,
        cardCoverImages: boolean
    };
    lists: List[];
    cards: Card[];
    members: {
        id: string,
        name: string,
        avatar: string
    }[];
    labels: {
        id: string,
        name: string,
        color: string
    }[];

    constructor(board)
    {
        this.name = board.name || 'Untitled Board';
        this.uri = board.uri || 'untitled-board';
        this.id = board.id || FuseUtils.generateGUID();
        this.settings = board.settings || {
            color          : '',
            subscribed     : true,
            cardCoverImages: true
        };
        this.lists = [];
        this.cards = [];
        this.members = board.members || sampleMembers;
        this.labels = board.labels || sampleLabels;
    }
}
