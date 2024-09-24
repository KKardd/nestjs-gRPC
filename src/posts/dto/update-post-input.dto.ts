import { IsInt, IsString, Length, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @IsInt()
  id: number;

  @IsOptional() // 필드가 선택 사항임을 명시
  @IsString()
  @Length(1, 100)
  title?: string;

  @IsOptional() // 필드가 선택 사항임을 명시
  @IsString()
  content?: string;
}
