const supabaseUrl = "https://ticzcxszdgryyieydcjb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpY3pjeHN6ZGdyeXlpZXlkY2piIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyMTkyOTksImV4cCI6MjAzMDc5NTI5OX0.PX0OhLR9KCbnmjsp1cshVTcZifAzerW3Si5G_-54Ucs";
const client = supabase.createClient(supabaseUrl, supabaseKey);
async function loadData() {
  let { data: pindata, error } = await client.from("coordinates").select("*");
  console.log(pindata[0].name);
  console.log(pindata);
  // 맵 기본좌표 선언
  const mainLat = 36.634997,
    mainLng = 127.4577953;

  let mapBox = document.querySelector("#map"), // 지도의 중심좌표
    mapOpt = {
      center: new kakao.maps.LatLng(mainLat, mainLng), // 지도의 중심좌표
      level: 5, // 지도의 확대 레벨
    };

  var map = new kakao.maps.Map(mapBox, mapOpt); // 지도를 생성합니다

  // 패턴화하기 1번째
  // let storeList = [
  //   {
  //     storeName: `${pindata[0].name}`,
  //     place: new kakao.maps.LatLng(
  //       `${pindata[0].Latitude}`,
  //       `${pindata[0].Longitude}`
  //     ),
  //   },
  //   {
  //     storeName: `${pindata[1].name}`,
  //     place: new kakao.maps.LatLng(
  //       `${pindata[1].Latitude}`,
  //       `${pindata[1].Longitude}`
  //     ),
  //   },
  //   {
  //     storeName: `${pindata[2].name}`,
  //     place: new kakao.maps.LatLng(
  //       `${pindata[2].Latitude}`,
  //       `${pindata[2].Longitude}`
  //     ),
  //   },
  //   {
  //     storeName: `${pindata[3].name}`,
  //     place: new kakao.maps.LatLng(
  //       `${pindata[3].Latitude}`,
  //       `${pindata[3].Longitude}`
  //     ),
  //   },
  //   {
  //     storeName: `${pindata[4].name}`,
  //     place: new kakao.maps.LatLng(
  //       `${pindata[4].Latitude}`,
  //       `${pindata[4].Longitude}`
  //     ),
  //   },
  //   {
  //     storeName: `${pindata[5].name}`,
  //     place: new kakao.maps.LatLng(
  //       `${pindata[5].Latitude}`,
  //       `${pindata[5].Longitude}`
  //     ),
  //   },
  // ];

  //   // 1. 생성자 함수 ( 객체를 패턴화해서 만들어주는 애 )
  function Store(storeName, Latitude, Longitude) {
    this.storeName = storeName;
    this.place = new kakao.maps.LatLng(Latitude, Longitude);
  }
  // this.키이름 = 인자
  function Ping(storeName, Latitude, Longitude) {
    this.storeName = storeName;
    this.Latitude =  Latitude;
    this.Longitude = Longitude;
    // this.place = new kakao.maps.LatLng(Latitude, Longitude);
  }

  // let storeList = [
  //   // new Store(pindata[0].name, pindata[0].Latitude, pindata[0].Longitude),
  //   // new Store(pindata[1].name, pindata[1].Latitude, pindata[1].Longitude),
  //   // new Store(pindata[2].name, pindata[2].Latitude, pindata[2].Longitude),
  //   // new Store(pindata[3].name, pindata[3].Latitude, pindata[3].Longitude),
  //   // new Store(pindata[4].name, pindata[4].Latitude, pindata[4].Longitude),
  //   // new Store(pindata[5].name, pindata[5].Latitude, pindata[5].Longitude),
  // ]
  let storeList = [];

  // for (let i = 0; i < pindata.length; i++) {
  //   let store = new Store(
  //     pindata[i].name,
  //     pindata[i].Latitude,
  //     pindata[i].Longitude
  //   );
  // }
  for (const pin of pindata) {
    let store = new Ping(
      pin.name,
      pin.Latitude,
      pin.Longitude
    );
    storeList.push(store);
  }
  console.log(storeList);

  var imageSrc = "/udt_project/test/img/pin_logo.png", // 커스텀마커 이미지
    imageSize = new kakao.maps.Size(40), // 마커이미지의 크기입니다
    imgOpt = { offset: new kakao.maps.Point(20, 40) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
  var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOpt)
  
  for (const ping of storeList) {
    var markerPosition = new kakao.maps.LatLng(ping.Latitude, ping.Longitude);
    var marker = new kakao.maps.Marker({
    position: markerPosition,
    map: map,
    image: markerImage,})
  }
  // 오버레이
  var content =
    '<div class="wrap">' +
    '    <div class="info">' +
    '        <div class="title">' +
    "            무야호~" +
    '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
    "        </div>" +
    '        <div class="body">' +
    '            <div class="img">' +
    '                <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="73" height="70">' +
    "           </div>" +
    '            <div class="desc">' +
    '                <div class="ellipsis">아즈카반의 5-23실</div>' +
    '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' +
    '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' +
    "            </div>" +
    "        </div>" +
    "    </div>" +
    "</div>";

  // 마커 위에 커스텀오버레이를 표시합니다
  // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
  var overlay = new kakao.maps.CustomOverlay({
    content: content,
    map: map,
    position: marker.getPosition(),
  });

  // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
  kakao.maps.event.addListener(marker, "click", function () {
    overlay.setMap(map);
  });

  // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
  function closeOverlay() {
    overlay.setMap(null);
  }
  closeOverlay();
}
window.addEventListener("load", loadData); //
