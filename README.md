<img width="50" alt="로고" src= https://user-images.githubusercontent.com/79234473/192390195-9604cc7f-9392-4df5-a469-fc774bb1b489.png>

<br>

# My Traveltory

> 여행의 느낌을 나만의 감성으로 기록하고 공유하는 플랫폼을 구현하였습니다.

<br>

## 🚀 [배포링크](https://my-traveltory.web.app/)

<br>

<p>
<img src ="https://drive.google.com/uc?id=1l3eneOkIsyxpOOwmB2MAidPgHQwBtAGE" width="360" height="600"/>
 &nbsp; &nbsp; &nbsp;
<img src ="https://drive.google.com/uc?id=13R66xDAPhGK4saqEnDD3gYNW3JV79Zgr" width="360" height="600"/>
</p>

<br>

- [빠른 시작](#빠른-시작)
- [주요 구현 기능](#주요-구현-기능)
- [페이지 및 기능 설명](#페이지-및-기능-설명)
- [기술 스택](#기술-스택)

<br>

# 빠른 시작

```
git clone https://github.com/Gryffindor0ne/traveltory.git
npm install
npm run start
```

<br>

# 주요 구현 기능

1. 소셜 로그인 & 게스트 로그인

2. 스토리 등록, 수정, 삭제

3. 스토리 상세조회

4. 스토리 카테고리별, 태그별 조회

5. 스토리 `좋아요` 표시 가능

6. 나만의 스토리 조회 가능

<br>

# 페이지 및 기능 설명

### 스토리 메인 페이지("/")

- 마이 트레블토리 앱의 메인 페이지입니다.

- 스토리 목록을 최신순으로 간략하게 보여줍니다.

  - 스토리 목록의 이미지, 제목, 내용 부분 클릭시 해당 스토리의 상세페이지로 이동합니다.

- `카테고리` 클릭시 선택한 카테고리에 해당하는 스토리만 보여집니다.

  - 카테고리의 기본 값은 '전체'입니다.

  - 카테고리는 '국내여행', '해외여행', '당일치기', '홀로가기', '함께가기', '여행노하우' 로 구성되어 있습니다.

- `태그` 를 클릭하면 해당 태그가 포함된 스토리만 볼 수 있습니다.

  - 선택된 태그명이 상단에 표시되며 해당 태그가 포함된 스토리만 나타납니다.

  - 태그를 선택하면 카테고리 바는 사라집니다.

### 스토리 상세페이지 ("/story/[해당 스토리 id]")

- 스토리 목록에서 선택된 스토리의 모든 내용을 볼 수 있습니다.

- 스토리의 태그를 클릭하면 해당 태그만 포함된 글 목록으로 이동합니다.

- 유저 본인이 작성한 스토리라면 수정, 삭제를 할 수 있습니다. (수정, 삭제 버튼 활성화)

  - 수정 버튼 클릭시 스토리 수정페이지로 이동합니다.

  - 스토리 수정페이지에서는 스토리를 수정하거나 스토리 수정을 취소할 수 있습니다.

  - 삭제 버튼 클릭시 경고 메세지가 활성화되고 확인하면 스토리가 삭제됩니다.

### 스토리 작성페이지 ("/story/new")

- 상단 메뉴바의 연필 버튼을 클릭하면 새 스토리 작성이 가능합니다.

- 이미지, 카테고리, 제목, 태그, 내용을 작성하고 새 스토리를 등록합니다.

  - 카테고리, 제목, 내용은 필수 입력 사항입니다.

- 태그 입력란에 원하는 태그를 적어 엔터키를 누르면 태그가 추가됩니다.

  - 입력된 태그는 `x`버튼을 클릭할 시 삭제 가능합니다.

- '새 스토리 등록' 버튼을 눌러 새 글을 작성하면 작성된 날짜가 자동으로 입력됩니다.

- '나가기' 버튼을 누르면 새 스토리 작성이 취소됩니다.

### 프로필 페이지("/profile")

- 상단 메뉴바의 사람 버튼을 클릭하면 프로필 페이지로 이동합니다.

- 프로필 페이지에서는 유저 닉네임과 이메일, 프로필 사진이 보여집니다.

- `로그아웃` 버튼은 유저 이메일 아래 존재하며 클릭시 로그아웃됩니다.

- 유저가 작성한 스토리가 있다면 해당 스토리 목록이 보여지고, 없다면 `작성한 스토리가 없습니다.` 가 보여집니다.

### 메뉴바

- 로고, 스토리 작성 버튼(연필모양), 프로필 버튼(사람모양)으로 구성되어 있습니다.

- 로고 클릭시 메인페이지로 이동하며 스토리 전체 목록을 보여줍니다.

- 스토리 작성 버튼 클릭시 새 스토리 작성페이지로 이동합니다.

- 프로필 버튼 클릭시 프로필 페이지로 이동합니다.

### 탑버튼

- 앱에서 일정 부분 스크롤하면 탑버튼이 생성됩니다.

- 탑버튼 클릭시 앱의 최상단으로 이동합니다.

<br>

# 기술 스택

<p align='center'>
   <img src="https://img.shields.io/badge/TypeScript-^4.8.3-darkblue?logo=TypeScript"/>
    <img src="https://img.shields.io/badge/React-^18.2.0-blue?logo=React"/>
    <img src="https://img.shields.io/badge/node.js-v16.15.0-green?logo=Node.js"/>
    <img src="https://img.shields.io/badge/firebase-^9.10.0-yellow?logo=firebase"/>
    <img src="https://img.shields.io/badge/redux-%5E8.0.2-purple?logo=redux"/>
    <img src="https://img.shields.io/badge/styled_Components-^5.3.5-pink?logo=styledComponents"/>
</p>
