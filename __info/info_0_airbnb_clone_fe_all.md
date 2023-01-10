## 17 Front-End SetUp

#### [1_React]

    드디어 프론트 엔드를 시작한다! create-react-app을 사용하며 chakra 라이브러리를 사용할 것이다.
    스크립트는 타입스크립트를 사용한다.

    우선 react를 설치한다.
    $ npm create-react-app airbnb-clone-frontend --templete=typescript
    # Happy hacking!

#### [Git]

    일부 파일들 및 코드를 삭제 해준다.
    정리가 된다면 git에 연결해준다.
    $ git remote add origin [연결시킬 주소]

#### [2_Chakra]

<https://chakra-ui.com/getting-started>

    이제 차크라 ui 를 설치한다.
    $ npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion

#### [1_React]

    6.4버젼 react router를 설치한다.
    $ npm i react-router-dom

#### [2_Chakra]

    설치가 다 되었다면 ChakraProvider로 app을 감싸준다.
    - src>index.tsx -
        import { ChakraProvider } from "@chakra-ui/react";

        root.render(
            ...
            <ChakraProvider>  # 해당 태그를 엔터쳐서 입력하면 자동으로 import해준다.
                <App />
            </ChakraProvider>
            ...
        );
    chakra의 특정 설정을 사용할 수 있게 되었다. 해당 테마와 구성을 컴포넌트에 전달하는 가장 좋은 방법이다.

    react앱 동작확인을 한다.
    $ npm run start
    오류없이 빈 브라우져가 나온다.
    chakra 객체를 넣어보겠다. 태그 입력 도중에 태그 추천 리스트의 오른쪽에 사용되는 라이브러리 이름이 뜬다. chakra-ui 라 뜬다.
    - src>App.tsx -
        function App() {
            return (
                <div>
                    <Text>It's works!!</Text>
                </div>
            );
        }
    텍스트가 브라우져에 나오면 react설치 및 차크라 ui 적용이 완료된다.

    차크라는 이쁘게 디자인되는 것도 있지만 기본으로 갖고 오는 설정들이 많다.
        <Text color={"red.600"} fontSize={"6xl"}>  # 색깔을 섞는 비율과 크기가 기본을 제공되는 값이다. 자동완성도 빠르다.
            It's works!!
        </Text>
    이외에도 반응형 화면을 위한 문법이 있다.
