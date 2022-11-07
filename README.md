# EGO ROUTINE

새로운 나를 만드는 습관  
매일매일 달라진 나를
에고루틴과 함께 만들어보세요!

### 개발 환경

| Type     | Skill                        | Description | Port / Path |
| -------- | ---------------------------- | ----------- | ----------- |
| client   | `react.js`                   | 웹 페이지   | 3000        |
| server   | `nest.js / sqlite / typeorm` | API 서버    | 8000        |
| API Docs | `swagger`                    | API 문서    | 8000 / docs |

사용언어: typescript  
퍼블리싱: antd, css_module, tailwind

### 패키지 설치

```sh
터미널에서, npm install ✅ #root 경로에서도 모듈 설치 필요
터미널에서 client 폴더로 이동 후, npm install ✅
터미널에서 server 폴더로 이동 후, npm install ✅
```

### 명령어 실행

```sh
터미널 root 경로에서 npm start # client와 server가 동시에 구동됨
```

### 더미 데이터 삽입

1. npm start 명령어를 이용해서 client와 server 구동
1. vscode 확장플러그인에서 SQLite 설치
1. server 폴더에 위치한 create-seed.sql 파일을 열고 오른쪽 마우스를 누르면 나타나는 메뉴에서 run Query 클릭
1. 상단 팔레트 창에서 server/db.sqlite 선택. (server가 구동중인 상태여야 나타남)

### API 문서

- 서버가 켜진 상태에서 http://localhost:8000/docs로 접속
- 보안처리를 위해 계정입력을 하도록 처리
- 상용단계가 아니라서 .env 파일을 노출함
