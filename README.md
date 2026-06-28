# 장비 SOP/MOP/EOP QR 문서함

## 사용 방법
1. `index.html`을 브라우저로 열기
2. 장비 목록에서 장비 선택
3. 상세 화면의 `QR에 넣을 URL`을 QR 코드로 생성
4. 실제 PDF는 `docs/` 폴더에 같은 파일명으로 넣기

## 장비 추가 방법
`app.js`의 `equipments` 배열에 장비를 추가하면 됩니다.

예:
```js
{
  id: 'UPS-02',
  name: 'UPS B계통',
  type: 'UPS',
  location: 'B3 UPS Room',
  manufacturer: 'Schneider Electric Galaxy VXL',
  documents: [
    { type: 'SOP', title: 'UPS 정상 운전 절차서', url: 'docs/UPS-02_SOP.pdf' },
    { type: 'MOP', title: 'UPS 유지보수 절차서', url: 'docs/UPS-02_MOP.pdf' },
    { type: 'EOP', title: 'UPS 장애 대응 절차서', url: 'docs/UPS-02_EOP.pdf' }
  ]
}
```


## QR Codes
- Open `qr-codes.html` to view/print sample QR labels.
- QR images are in the `qr-codes` folder.
- Current base URL: `https://flourishing-taffy.lovable.app`
