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


    error페이지 컴포넌트를 생성하여 적용한다. route에 NotFound를 생성한다.
    - src>routes>NotFound -
        export default function NotFound() {
            return <h1>Not Found</h1>;
        }
    - src>router -
        const router = createBrowserRouter([
        {
            ...
            errorElement: <NotFound />,
        ...
    페이지를 찾지 못할 경우 NotFound페이지를 렌더링한다.

#### [2_chakra]

    NotFound페이지를 chakra 태그로 구성해본다.
        export default function NotFound() {
            return (
                <VStack>  # 수직방향으로 요소를 배열한다.
                    <Heading>Page not found</Heading>  # 제목
                    <Text>It's seems that you're lost.</Text>
                    <Button>Go Home</Button>
                </VStack>
            );
        }
    기본 속성들로 제법 예쁘게 구성이 된다.

    chakra는 기존 css속성을 단축해서 사용가능하다.

<https://chakra-ui.com/docs/styled-system/style-props>

        <VStack justifyContent={"center"} minH="100vh">  # minH: minHeight

    차크라에 button에는 variant라는 속성이 있다.

<https://chakra-ui.com/docs/components/button/usage#button-variants>

    colorScheme, emoticon 등 기능이 있다.
        <Button colorScheme={"red"} variant={"link"}>
          Go Home &rarr;
        </Button>

[1_React]

    button을 react-router-dom의 Link로 덮어준다.
      <Link to="/">
        <Button colorScheme={"red"} variant={"link"}>
          Go Home &rarr;
        </Button>
      </Link>
    버튼 클릭시 홈으로 이동한다.

[2_Chakra]

    root에 header를 생성한다.
        export default function Root() {
            return (
                <Box>
                    I'm Root
                    <Outlet />
                </Box>
            );
        }
    해당 박스를 header로 구성해본다.
    airbnb 아이콘을 넣어본다. react-icon에서 확인할 수 있다.

<https://react-icons.github.io/react-icons/>

    react-icon을 설치해준다.
    $ npm install react-icons --save

    아이콘중 Font Awesome을 사용한다.
        import { FaAirbnb } from "react-icons/fa";  # 이모티콘을 추가할때에는 import를 한 후 태그를 써준다.

        ...
            <FaAirbnb />  # 사이트에서 복사한 태그명을 사용하면 된다.

    색상 및 간격에 대한 chakra의 설정값들을 알고 사용하면 유용하다.
    디자인이 흐트러지지않고 적용이 가능하다.

<https://chakra-ui.com/docs/styled-system/theme>

    root의 header를 구성해본다.
        <HStack
            justifyContent={"space-between"}
            px={"5"}  # px == paddingX
            py={"10"}  # px == paddingY
            borderBottomWidth={1}  # border선이 밑에서만 굴기 1로 생성되면 색깔도 자동으로 gray.500으로 설정해준다.
        >
            <Box color={"red.500"}>  # Font Awesome태그는 chakra태그가 아니기때문에 color값을 #ffefd 스타일로 직접넣어줘야한다.
                                     # 대신 Box 부모 태그를 만들어서 box에다 charkra color 속성을 적용해준다.
                <FaAirbnb size={"48"} />  # Font Awesome 태그. == 48px
            </Box>
            <HStack spacing={2}>  # spacing: 태그사이의 간격. == 2rem
                <IconButton  # Icon을 넣는 버튼
                    variant={"ghost"}
                    aria-label="Toggle dark mode"
                    icon={<FaMoon />}  # 태그형태로 넣어줘야 한다.
                />
                <Button>Log in</Button>
                <Button colorScheme={"red"}>Sign in</Button>
            </HStack>
        </HStack>
    좌측엔 airbnb 아이콘, 우측엔 login과 sign up 버튼을 생성했다.


    log in 모달을 구현한다.
    이제 모달을 생성하겠다. modal은 표현되는 부분이 아니며 데이터 변경만 하기때문에 위치는 중요하지 않다.
        <Modal isOpen={false}></Modal>
    모달을 변경시킬 함수를 생성한다.
        const { isOpen, onClose, onOpen } = useDisclosure(); // react훅(chakra UI)
    useDisclosure() 에서 'isOpen' boolean과 close, open 함수를 제공해준다.
    modal을 구성해본다.
        ...
          <Button onClick={onOpen}>Log in</Button>
        ...
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />  # 페이지를 어둡게해서 model을 더 집중적으로 만들어준다.
            <ModalContent>
                <ModalHeader>Log In</ModalHeader>
                <ModalBody>
                    <Input variant={"filled"} placeholder={"Username"} />
                    <Input variant={"filled"} placeholder={"Password"} />
                    <Button colorScheme={"red"} w={"100%"}>  # w == wight. 길이를 모달창에 맞춘다.
                        Log In
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    modal이 생성되고 사라질때 애니메이션도 있다.
    input들과 Button이 간격이 없다. stack태그로 감싸준다. input창에 이모티콘도 추가해준다.
        <VStack>
            <InputGroup>  # Input창안에 여러가지 요소를 넣을경우 사용한다. 요소간에 간격을 만들어 준다
                <InputLeftElement ... children={<FaUserEdit />} />  # 이모티콘을 왼쪽에 추가해준다
                <Input ... placeholder={"Username"} />
            </InputGroup>
            <InputGroup>
                <InputLeftElement ... children={<FaLock />} />
                <Input ... placeholder={"Password"} />
            </InputGroup>
            ...
        </VStack>
