import { OmitType } from "@nestjs/swagger";
import { Routine } from "./../entitles/routine.entity";

export class CreateRoutineDto extends OmitType(Routine, ["id"] as const) {}
