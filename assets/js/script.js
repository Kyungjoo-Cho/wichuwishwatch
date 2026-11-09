
/* ===================================
   1. 다마고치 버튼 테스트
=================================== */

const buttonA = document.getElementById("buttonA");
const buttonB = document.getElementById("buttonB");
const buttonC = document.getElementById("buttonC");

buttonA.addEventListener("click", function () {
  alert("A 버튼 클릭!");
});

buttonB.addEventListener("click", function () {
  alert("B 버튼 클릭!");
});

buttonC.addEventListener("click", function () {
  alert("C 버튼 클릭!");
});


/* ===================================
   2. 화면 요소 가져오기
=================================== */

const loadingScreen = document.getElementById("loadingScreen");
const siteWrap = document.querySelector(".site-wrap");

const welcomeScreen = document.getElementById("welcomeScreen");
const welcomeTypeMask = document.getElementById("welcomeTypeMask");
const wishMessage = document.getElementById("wishMessage");

const nameScreen = document.getElementById("nameScreen");
const wichuNameInput = document.getElementById("wichuName");
const startButton = document.getElementById("startButton");


/* ===================================
   3. WELCOME 이미지 애니메이션
=================================== */

function playWelcomeSequence() {

  welcomeScreen.hidden = false;
  wishMessage.hidden = true;
  nameScreen.hidden = true;

  nameScreen.classList.remove("is-entering", "is-visible");

  // WELCOME 타이핑 시작
  welcomeTypeMask.classList.remove("is-typing");

  void welcomeTypeMask.offsetWidth;

  welcomeTypeMask.classList.add("is-typing");

  // BE MY WISH 이미지가 한 번에 등장
  setTimeout(function () {
    wishMessage.hidden = false;
  }, 1900);

  // 이름 짓기 화면으로 부드럽게 전환
  setTimeout(function () {

    // 이름 화면을 투명한 상태로 준비
    nameScreen.classList.add("is-entering");
    nameScreen.hidden = false;

    // 화면이 준비된 다음 나타나기
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {

        nameScreen.classList.remove("is-entering");
        nameScreen.classList.add("is-visible");

      });
    });

    // 전환이 끝난 다음 WELCOME 숨기기
    setTimeout(function () {
      welcomeScreen.hidden = true;
      wichuNameInput.focus({ preventScroll: true });
    }, 450);

  }, 4000);
}


/* ===================================
   4. 로딩 화면 전환
=================================== */

setTimeout(function () {

  siteWrap.style.visibility = "visible";

  loadingScreen.classList.add("fade-out");

  setTimeout(function () {

    loadingScreen.remove();

    playWelcomeSequence();

  }, 600);

}, 3000);



/* ===================================
   5. 위츄 이름 입력 규칙
=================================== */

// 허용: 한글, 영어, 숫자, , . * - _ ! ? ^
const allowedNameCharacter = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9,.*_!?^-]$/;

// 입력된 이름의 길이 계산
function getNameLength(name) {
  const characters = Array.from(name);
  const hasEnglish = /[a-zA-Z]/.test(name);

  // 한글만 사용한 이름 (숫자, 특수문자 포함)
  // 최대 6글자
  if (!hasEnglish) {
    return characters.length;
  }

  // 영어 또는 한글+영어 혼합
  // 한글은 2칸, 나머지는 1칸
  return characters.reduce(function (total, char) {
    return total + (/[가-힣ㄱ-ㅎㅏ-ㅣ]/.test(char) ? 2 : 1);
  }, 0);
}

// 한글이 포함되고 영어가 없으면 6글자,
// 영어가 포함되면 10칸
function getNameLimit(name) {
  return /[a-zA-Z]/.test(name) ? 10 : 6;
}

// 허용 문자와 최대 길이 검사
function filterWichuName(value) {
  let result = "";

  for (const char of Array.from(value)) {
    if (!allowedNameCharacter.test(char)) {
      continue;
    }

    const next = result + char;

    if (getNameLength(next) <= getNameLimit(next)) {
      result = next;
    }
  }

  return result;
}

// 입력할 때 바로 제한
wichuNameInput.addEventListener("input", function () {
  const filtered = filterWichuName(wichuNameInput.value);

  if (wichuNameInput.value !== filtered) {
    wichuNameInput.value = filtered;
  }
});

// START 버튼
startButton.addEventListener("click", function () {
  const name = filterWichuName(wichuNameInput.value);

  if (name === "") {
    alert("위츄의 이름을 입력해 줘!");
    wichuNameInput.focus();
    return;
  }

  wichuNameInput.value = name;

  alert(name + "의 모험이 시작됩니다! ♡");
});

