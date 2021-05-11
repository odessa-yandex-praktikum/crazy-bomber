import {BUILDING} from '../consts';
import BomberImg from '../assets/images/bomber_icon.png';
import ApartmentHouseImg from '../assets/images/house_1.png';
import ApartmentHouseImg2 from '../assets/images/house_2.png';
import LowSkyscraperImg from '../assets/images/house_3.png';
import MediumSkyscraperImg from '../assets/images/house_4.png';
import HighSkyscraperImg from '../assets/images/house_5.png';
import PlantImg from '../assets/images/house_6.png';
import SchoolImg from '../assets/images/house_7.png';
import PublishingHouseImg from '../assets/images/house_8.png';

class Coordinate {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class Building {
    coordinate: Coordinate;
    type: any;
    isDestroyed: boolean;
    destroyLimit: number;
    img: string;

    constructor(coordinate: Coordinate, type: BUILDING) {
        this.coordinate = coordinate;
        this.isDestroyed = false;
        this.type = type;
        switch (this.type) {
            case BUILDING.APARTMENT_HOUSE_1:
                this.destroyLimit = 30;
                this.img = String(ApartmentHouseImg);
                break;
            case BUILDING.APARTMENT_HOUSE_2:
                this.destroyLimit = 50;
                this.img = String(ApartmentHouseImg2);
                break;
            case BUILDING.LOW_SKYSCRAPER:
                this.destroyLimit = 70;
                this.img = String(LowSkyscraperImg);
                break;
            case BUILDING.MEDIUM_SKYSCRAPER:
                this.destroyLimit = 90;
                this.img = String(MediumSkyscraperImg);
                break;
            case BUILDING.HIGH_SKYSCRAPER:
                this.destroyLimit = 130;
                this.img = String(HighSkyscraperImg);
                break;
            case BUILDING.PLANT:
                this.destroyLimit = 30;
                this.img = String(PlantImg);
                break;
            case BUILDING.SCHOOL:
                this.destroyLimit = 15;
                this.img = String(SchoolImg);
                break;
            case BUILDING.PUBLISHING_HOUSE:
                this.destroyLimit = 70;
                this.img = String(PublishingHouseImg);
                break;
            default:
                this.destroyLimit = 30;
                this.img = String(ApartmentHouseImg);
                break;
        }
    }
}

class Bomber {
    coordinate: Coordinate;
    damage: number;
    img: string;

    constructor(coordinate: Coordinate) {
        this.coordinate = coordinate;
        this.damage = 15;
        this.img = String(BomberImg);
    }
}

export {Coordinate, Building, Bomber};
