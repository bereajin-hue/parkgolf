# 그리너투어 홈페이지

일본 파크골프(시즈오카·후지산) 전문여행사 "그리너투어"의 원페이지형 정적 홈페이지입니다. 베를리너투어(https://github.com/bereajin-hue/berlinertour)와 동일한 레이아웃/컴포넌트 구조를 벤치마킹해 제작했습니다. GitHub → Cloudflare Pages 연동으로, `main`(또는 배포 브랜치)에 push하면 자동 배포됩니다. 별도 빌드 과정 없이 순수 HTML/CSS/JS로 구성되어 있습니다.

## 상품 구성

일본 현지 여행사(공급사) 견적을 기반으로 시즈오카·후지산 파크골프 2박3일 상품을 **실속 / 정통 / 품격** 3개 등급으로 구성했습니다.

| 등급 | 라운드 | 숙박 | 판매가(1인, 8인~ 출발) |
| --- | --- | --- | --- |
| 실속 | 2회 (36홀×2일) | 3성급 비즈니스호텔 2박 | 63,000엔 |
| 정통 | 3회 (36홀×3일) | 3성급 비즈니스호텔 연박 | 76,000엔 |
| 품격 | 3회 (36홀×3일) | 온천호텔 연박(조·석식포함) | 94,000엔 |

> 판매가는 공급사 도매가 기준 **약 10% 마진**을 반영한 금액입니다. 공급사 도매가·수배 수수료 등 원가 정보는 공개 저장소 특성상 이 사이트/저장소에 포함하지 않았습니다(별도 사내 자료로 관리 권장).

## 폴더 구조

```
/
├── index.html                     투어 허브(등급 비교) 홈페이지
├── products/
│   ├── susono-value/index.html    실속 상품 상세페이지
│   ├── susono-standard/index.html 정통 상품 상세페이지
│   └── susono-premium/index.html  품격 상품 상세페이지
├── terms.html                     이용약관 (초안 — 게시 전 법률 검토 필요)
├── privacy.html                   개인정보처리방침 (초안 — 게시 전 법률 검토 필요)
├── products.json                  GNB "상품" 드롭다운에 표시되는 상품 목록 데이터
├── assets/
│   ├── css/style.css
│   └── js/main.js
└── images/
    ├── hero/                1.jpg, 2.jpg
    ├── destinations/        fuji-parkgolf/, oyama-parkgolf/, kawaguchiko/, onsen/, susono-hotel/
    ├── reviews/              1.jpg ~ 8.jpg
    ├── guide/                1.jpg
    └── og-image.jpg
```

## 사진 교체 방법 (운영자용)

현재 `images/` 폴더에는 실제 사진이 아직 없어 자리표시용(placeholder) 이미지가 들어가 있습니다. 코드를 건드릴 필요 없이 **`images/` 폴더 안의 파일을 같은 이름으로 덮어쓰고 git push**하면 됩니다.

1. 새 사진을 준비합니다 (권장: 가로형 JPG, 코스소개/후기 사진은 4:3 비율, 히어로 사진은 16:9 비율, 가이드 사진은 1:1 비율).
2. 기존 파일과 정확히 같은 경로·파일명으로 저장합니다.
   - 예) 후지산 파크골프장 사진 교체 → `images/destinations/fuji-parkgolf/1.jpg` 덮어쓰기
   - 예) 후기 카드 3번째 사진 교체 → `images/reviews/3.jpg` 덮어쓰기
3. `git add images/... && git commit -m "사진 업데이트" && git push` 하면 Cloudflare Pages가 자동으로 재배포합니다.

## 요금 수정 방법

각 상품 상세페이지(`products/susono-*/index.html`)의 `id="overview"`, `id="price"` 섹션과 홈페이지(`index.html`)의 `id="plans"` 섹션에서 가격을 직접 수정합니다. **3개 파일(홈 + 상품페이지) 모두 동일한 가격으로 맞춰야** 합니다.

## 후기(리뷰) 텍스트/문구 수정

`index.html`과 `products/*/index.html`의 `id="reviews"` 섹션에서 각 `<article class="review-card">` 블록의 문구·별점·태그를 직접 수정합니다. 4개 파일 모두 동일한 내용이므로 **전 파일 수정**이 필요합니다.

## 새 상품(다른 지역/코스) 추가 방법

1. `products/새상품슬러그/` 폴더를 만들고 그 안에 `index.html`을 작성합니다 (기존 `products/susono-value/index.html`을 복사해서 내용만 수정하는 방식을 권장합니다).
2. `products.json`에 새 상품 항목을 한 줄 추가합니다.
3. 모든 페이지의 `<ul class="nav-dropdown" data-products-dropdown>` 정적 목록에도 동일 항목을 추가해 두면, `fetch`가 실패하는 환경(`file://`로 직접 열람 등)에서도 드롭다운이 정상 표시됩니다.

## 로컬 미리보기

빌드 과정이 없으므로 정적 서버로 폴더를 열면 됩니다.

```bash
python3 -m http.server 8000
# http://localhost:8000 접속
```

(주의: `fetch('/products.json')`은 `file://`로 직접 여는 경우 동작하지 않으므로, 반드시 로컬 서버를 통해 확인하세요.)

## Cloudflare Pages 배포 설정

- Build command: 없음 (Framework preset: None)
- Build output directory: `/` (저장소 루트)
- 이 저장소를 Cloudflare Pages 프로젝트에 연결하고 배포 브랜치를 지정하면, 이후 해당 브랜치에 push할 때마다 자동으로 재배포됩니다.
- 각 HTML의 `canonical`/`og:image` URL은 `https://greenertour.pages.dev/` 기준 placeholder이므로, 실제 배포 도메인이 정해지면 전체 파일에서 일괄 치환해 주세요.

## 남은 작업 (게시 전 확인사항)

- [ ] `images/` 폴더의 자리표시용 사진을 실제 코스/호텔/후기 사진으로 교체
- [ ] `terms.html`, `privacy.html` 내용 법률 검토 (관광진흥법 표준약관 준수 여부 포함)
- [ ] 연락처(전화/카카오톡)가 그리너투어 전용 채널인지, 베를리너투어와 공동 운영 채널인지 확정
- [ ] 실제 배포 도메인 확정 후 canonical/OG URL 일괄 수정
- [ ] 공급사(현지 랜드사) 견적 변동 시 판매가·마진율 재확인
