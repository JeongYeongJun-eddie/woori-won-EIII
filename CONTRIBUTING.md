# WON뱅킹 프론트엔드 팀 작업 가이드

## 폴더 구조

```
woori-won-EIII/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .oxlintrc.json
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── index.css
    ├── assets/
    │   ├── hero.png
    │   ├── react.svg
    │   └── vite.svg
    ├── components/
    │   └── ui/            # 공용 UI 컴포넌트 (버튼, 모달 등)
    ├── constants/          # api.js 등 상수/설정
    └── layouts/            # 공통 레이아웃 컴포넌트
```

`components/ui`, `constants`, `layouts`는 아직 빈 폴더라 Git 추적용 `.gitkeep`을 넣어둔 상태입니다.

## 프로젝트 생성 명령어 (참고용, 이미 완료됨)

```bash
npm create vite@latest . -- --template react
npm install
mkdir -p src/components/ui src/constants src/layouts
touch src/components/ui/.gitkeep src/constants/.gitkeep src/layouts/.gitkeep
```

## GitHub 저장소 정보

- 저장소: https://github.com/JeongYeongJun-eddie/woori-won-EIII
- 기본 브랜치: `main` (직접 push 금지, PR 필수 + 리뷰 1인 이상 승인)

## 팀원 합류 (클론) 명령어

```bash
git clone https://github.com/JeongYeongJun-eddie/woori-won-EIII.git
cd woori-won-EIII
npm install
npm run dev
```

## 백엔드(API 서버) 함께 실행

프론트와 별도로 `won-banking-api` 서버를 켜둬야 API 연동이 됩니다.

```bash
cd won-banking-api
npm install
npm start   # http://localhost:4000
```

---

# 브랜치 전략

## 브랜치 구조

실습 규모라 `develop` 같은 중간 브랜치 없이 단순하게 갑니다.

```
main                          # 항상 동작하는 상태 유지, 직접 push 금지
 ├─ feature/home-screen        # 계좌 홈 화면 담당
 ├─ feature/transfer-screen    # 이체 화면 담당
 ├─ feature/history-screen     # 거래내역 화면 담당
 └─ fix/xxx                    # 버그 수정
```

## 브랜치 네이밍 규칙

| 종류 | 형식 | 예시 |
|---|---|---|
| 기능 개발 | `feature/화면명` | `feature/home-screen`, `feature/transfer-screen` |
| 버그 수정 | `fix/내용` | `fix/transfer-amount-validation` |
| 공용 설정/잡일 | `chore/내용` | `chore/api-constants` |

담당 화면별로 브랜치를 나누므로 파일 충돌 가능성이 낮습니다 — `HomeScreen.jsx`, `TransferScreen.jsx`, `HistoryScreen.jsx`처럼 파일 자체가 다르기 때문입니다. 다만 `App.jsx`, `constants/api.js`처럼 공용 파일을 여러 명이 만질 경우 반드시 작업 전 `main` 최신화 후 시작하세요.

## 작업 흐름

```bash
# 1. 작업 시작 전 main 최신화
git checkout main
git pull origin main

# 2. 담당 화면 브랜치로 이동 (이미 원격에 생성되어 있음)
git checkout feature/home-screen
git pull origin feature/home-screen

# 3. 작업 후 커밋
git add .
git commit -m "feat: 홈 화면 계좌 목록 렌더링 추가"

# 4. 원격에 푸시
git push origin feature/home-screen

# 5. GitHub에서 PR(Pull Request) 생성
#    base: main ← compare: feature/home-screen

# 6. 팀원 리뷰 후 Merge, 머지된 브랜치는 삭제
```

## 커밋 메시지 컨벤션 (간단 버전)

| 접두사 | 용도 |
|---|---|
| `feat:` | 새 기능 추가 |
| `fix:` | 버그 수정 |
| `chore:` | 설정, 잡일 (패키지 설치 등) |
| `refactor:` | 동작 변화 없는 코드 정리 |
| `style:` | CSS/포맷팅만 변경 |

## PR 규칙

- PR 제목: `[화면명] 작업 내용` (예: `[홈화면] 계좌 잔액 API 연동`)
- 최소 1명 이상 리뷰 승인 후 Merge
- 머지 방식은 **Squash and merge** 추천 (커밋 히스토리 깔끔하게 유지, main 로그에는 PR 단위로만 남음)

## GitHub 설정 (main 보호) — 적용 완료

Settings → Branches → `main` 규칙

- ☑ Require a pull request before merging
- ☑ Require approvals (1개 이상)
