## EGO ROUTINE

## 1차 개발

### UI개발

1. 로그인, 회원가입 페이지
2. 사용자 가이드 페이지
3. 요금제 페이지
4. 루틴 페이지
5. 메인 인트로 페이지

### 기능개발

1. 로그인, 회원가입 기능
2. 루틴 추가, 수정, 삭제, 부분조회, 완료 기능

## TODO - Client

1. 로그인, 회원가입 유효성 체크
2. 요금제 페이지 제작
3. 사용자 가이드 페이지 제작
4. 좌우버튼 추가후 '주'단위로 루틴 변경
5. 전체보기 클릭시, 해당하는 '주' 보여주기
6. 루틴 완료 기능
7. 루틴 리스트 페이지 css
8. 루틴 에디터 페이지 css
9. do done이용해서 그것만 검색되게 하는거 만들기

client/src/service/routine-client.ts
client/src/pages/Main.tsx
client/src/components/RoutineModal.tsx
client/src/components/RoutineList.tsx
client/src/components/RoutineItem.tsx
client/src/components/RoutineEditor.tsx
status 추가해주기
type Status = "DO" | "DONE"

api 경로 user -> users로 변경됨

## TODO - Server

1. 유저와 루틴 컨트롤러에
   @UseGuards(JwtAuthGuard)
   적용

2. api 일괄 삭제

- 사용자가 누를 수 있는 루틴 삭제 => 사용자의 id를 파라미터로 넘기

@Unique(["email"]) =>
@Column({ unique: true })로 대체가능한지 확인

- 사용자가 루틴 status 넘기면 해당 staus만 필터링 되는 루틴 조회하기
