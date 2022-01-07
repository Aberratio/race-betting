import { ParticipantDto } from "../dto/ParticipantDto";

export interface RaceDetails {
    id: number;
    name: string;
    active: boolean;
    participants: ParticipantDto[];
}