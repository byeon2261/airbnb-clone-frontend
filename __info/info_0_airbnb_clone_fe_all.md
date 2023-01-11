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

#### [1_React]

    브라우져 탐색 표시줄에 나타날 URL을 리액트-라우터에 설명하는 작업을 진행한다. 해당 URL에 위치할 때 보여줄 컴포넌트를 선택해야 한다.
    로직은 기존 라우터 5버젼과 같지만 그걸 설명하는 방식, 즉 API가 달라져서 코드가 약간 달라졌다.
    src>router.ts 를 생성해준다.

    기존에 5버젼에서 라우터를 구성하던 로직이다.
    - src>router.ts -
        <Router>
            <Route path="/">
                <Home>  # 컴포넌트
            </Route>
            <Route path="/movie/:id">
                <MovieDetail>
            </Route>
        </Router>
    url을 보내면 라우터에서 해당 url을 대조해서 해당하는 컴포넌트를 보내준다.
    하지만 6.4버젼은 조금 다르다.
    이번 프로젝트는 루트(홈) 컴포넌트를 생성한다. 루트 컴포넌트가 모는 컴포넌트의 상위컴포넌트가 될거다.
    해당 컴포넌트위에 자식 컴포넌트가 상속받아 화면을 구성한다.

    router.ts에서 라우터 컴포넌트를 가져와야하니 .tsx로 변경하며 components폴더를 생성하여 root.tsx를 생성해준다.
    - src>components>root.tsx -
        export default function Root() {
           return <h1>I'm Root</h1>;
        }

    root를 router에 포함시켜준다. 6.4버젼으로 구성하겠다.
    - src>router.tsx -
        import { createBrowserRouter } from "react-router-dom";  # import는 태그를 완성하면 자동으로 import된다.
        import Root from "./components/root";

        const router = createBrowserRouter([  # 이안에 라우터 배열을 둘거다.
            {
                path: "/",
                element: <Root />,
            },
        ]);

    App.tsx는 삭제한다.
    index.tsx에 App를 대신에 router를 구성한다.
        import router from "./router";

        root.render(
            <React.StrictMode>
                <ChakraProvider>
                    <RouterProvider router={router} />  # RouterProvider로 공급 태그를 사용한다. router를 지정해야한다.
                </ChakraProvider>
            </React.StrictMode>
        );
    router가 import가 되지 않을 것이다. router를 export해줘야 한다.
    - router -
        ...
        export default router;
    router구성이 완료되었다. 브라우져에서 root에 등록한 텍스트가 표시된다.

    해당 root에 header와 footer를 구성하며 다른 페이지에서 중간 화면을 렌더링하도록 구성하겠다.
    src에 route폴더를 생성하여 home.tsx, users.tsx파일을 생성한다.
        export default function  Home() {  # Users 도 같게 적용
            return <span>...</span>;
        }
    router에 자식 컴포넌트로 추가해준다.
        path: "/",
        element: <Root />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "users",
                element: <Users />,
            },
        ],
    Root.tsx에 Outlet태그를 추가해준다.
        export default function Root() {
            return (
                <h1>
                    I'm Root
                    <Outlet />  # children components가 여기에 적용된다.
                </h1>
            );
        }
    브라우져에 확인을 하면 URL에 따라 home 택스트와 users택스트가 추가된다.
