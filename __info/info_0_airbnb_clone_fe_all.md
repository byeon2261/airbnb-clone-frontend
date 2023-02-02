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
            ...
        </VStack>


    sns 로그인 버튼을 구현한다. 구현 전 컴포넌트를 각 기능으로 분리하는 방식으로 리팩토링해보도록 하겠다.
    header, log in, sns log in 등 각각 분리한다.
    우선 소셜 로그인 부분부터 작업한다.
        <HStack my={8}>  # 기존 로그인 컴포넌트와 sns로그인 버튼 간격을 둔다.
            <Divider />  # 가로로 절취선같이 선이 나눠진다. #18.2 Sign Up Modal_1 이미지 참조
            <Text
                textTransform={"uppercase"}  # 대문자 변환
                fontSize={"xs"}
                as={"b"}  # bold체
            >
            ...
            <Divider />  # 세로로 나누는 태그도 있다.
        ...
            <Button leftIcon={<FaGithub />} ...>  # 버튼에서는 ...Icon 속성을 사용하여 이미지를 넣을 수 있다
            ...
    설정 적용확인 후 절취선과 sns 로그인 버튼은 컴포넌트 분리를 한다. 해당 태그를 Box태그로 감싸서 새 컴포넌트에 옮겨준다.
    scr/components/socialLogin.tsx 생성
    - socialLogin -
        export default function SocialLogin() {
            return (
                <Box mb={4}>
                    ...root에 있던 sns로그인 코드
                </Box>
            );
        }
    root코드의 기존에 있던 코드가 비워진 곳에 새로 생성한 컴포넌트 태그를 사용한다.
        ...
        <SocialLogin />
        ...
    옮기기 전과 똑같이 동작하는 것을 확인한다.

    같은 방식으로 login을 새로 컴포넌트를 생성하여 옮겨준다.
        export default function LoginModal({onClose, isOpen}) {  # root에서 해당값을 받아와야한다.
            return (
                <Modal onClose={onClose} isOpen={isOpen}>
                    ...
                </Modal>
    root에서 받을 값의 type을 정의하기 위한 interface를 구성한다.
        interface LoginModalProps {
            isOpen: boolean;
            onClose: () => void;
        }
    type을 지정해준다.
        ... LoginModal( {onClose, isOpen}:LoginModalProps )
    root에서 해당 값을 보내줘야한다. root에 컴포넌트 태그를 추가해준다.
        ...
        <LoginModal isOpen={isOpen} onClose={onClose} />
        ...

    header도 새로 컴포넌트를 생성한다. useDisclosure 훅도 같이 옮겨준다.
    작은것부터해서 큰것까지 전부 컴포넌트로 이동시켰다.

    SignUpModal을 구현한다. SignUpModal은 LoginModal과 유사하기때문에 LoginModal을 복사해와서 변경한다.

    root에서 훅에서 갖고온 변수 명을 변경하여 login과 signUp에 각각 넣어주자.
        const {
            isOpen: isLoginOpen,
            onClose: onLoginClose,
            onOpen: onLoginOpen,
        } = useDisclosure();
        ...
            <Button onClick={onLoginOpen}>Log in</Button>
            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />


    다크모드 버튼을 구현한다. 다크모드를 사용할때 사용자의 셋팅값을 가져와서 보여주는 것과 상관없이 기본 default값을 보여주며 변경할지 결정해야한다.
    src/theme.ts를 생성한다.
        import { extendTheme, type ThemeConfig } from "@chakra-ui/react";  # type: 타입값만 상속한다

        const config:ThemeConfig = {  # ThemeConfig 타입을 지정해주면 자동완성기능을 사용할 수 있다.
            initialColorMode:"system"  # :<<< light, dark, system
            useSystemColorMode: false,  # 유저의 시스템 색깔모드를 따라갈 것인지 정의. false로 해야 버튼으로 변경이 가능
        }
        const theme = extendTheme({ config });

        export default theme;
    해당 설정값을 chakraProvider의 속성에 넣어서 확장해준다.
    - src.index -
        ...
        <ChakraProvider theme={theme}>  # theme를 import해준다.
        ...
    color mode sript를 추가한다. 해당 스크립트는 이전에 사용자가 선택한 색을 로컬 저장소에 저장한다.
        ...
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        ...
    브라우져에 local storage에서 color-mode값이 저장된다. 해당값을 삭제하고 theme에 color값을 변경하면 화면이 변경된다.
    값을 변경해주는 toggle기능을 구현한다.
        const { colorMode, toggleColorMode } = useColorMode();  # 훅

        ...
        <IconButton
          onClick={toggleColorMode}
          ...
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}  # light일 경우 달 모양이다.
        />
    color mode에 따라 이모티콘이 변경된다.

    component중 color mode가 변경되지 않길 원한다면 chakra에서 지원하는 light mode(or dark mode) 태그로 감싸주면 된다.
        <LightMode>
            ...
        </LightMode>

    특정 색깔모드일 때 색을 지정할 수 있다.
    상단에 달모양과 해모양 이모티콘 변경하듯 속성을 변경하는 대신 chakra에서 이 기능을 대신할 hook이 있다.
        # 첫번째 매개변수에는 light일때 두번째 매개변수는 dark일때 반환된다.
        const logoColor = useColorModeValue("red.500", "red.200");

        <Box color={logoColor}>
            <FaAirbnb size={"48"} />
        </Box>
    다크모드 변경 아이콘도 훅을 이용하여 정의하도록 한다. componenet 는 대문자로 정의한다.
        const Icon = useColorModeValue(FaMoon, FaSun);

        <IconButton
          ...
          icon={<Icon />}
        />
    ! 컴포넌트는 대문자로 정의해야한다!
     useColorMode() 에 colorMode는 이제 필요 없기때문에 삭제해준다.


    room을 보여줄 그리드를 구성한다.
        # columnGap: x축 간격. rowGap: y축 간격. templateColumns: column을 격자로 생성해준다. (5, 1fr): 5컬럼을 최대크기로 배치
        <Grid ... columnGap={4} rowGap={8} templateColumns={"repeat(5, 1fr)"}>
            <VStack alignItems={"flex-start"}>  # 기본 중간정렬이다. flex-start로 앞으로 정렬
                # hidden값을 부여해야 rounded값이 box안에 이미지에 적용된다.. rounded: border-radios기능
                <Box overflow={"hidden"} ... rounded={"3xl"}>
                ...
                    <Grid gap={2} templateColumns={"6fr 1fr"}>  # 6:1 비율로 컬럼을 배치한다.
                        <Text display={"block"}  noOfLines={1} ...>  # block why??. 텍스트가 일정이상 줄이 넘어가면 생략한다
                    ...


    room 이미지 위에 하트 버튼을 생성한다.
        <Box position={"relative"} ...>
            <Button
                variant={"unstyled"}
                position="absolute"
                top={2}  # 상단 우측
                right={0}
                color="white"
            >
                <FaRegHeart size="20px" />
            </Button>
        ...

    그리드 화면 크기별 그리드 배열을 변경하는 기능을 구현한다.
    그리드 안에 많은 배열값 함수를 생성하여 여러개 room객체를 생성한다.
        <Grid ... >
            {[
                1, 2, 3, 4, 5, 6, 7, 7, 8, 9, 3, 4, 5, 3, 4, 3, 4, 3, 4, 3, 3, 4, 3, 4, ...
            ].map((index) => (
                <VStack ...> ...  # 기존에 생성한 room
            ))}
        </Grid>
    room객체가 여러개가 생성이된다.
    크기별 객체 배열을 설정한다. 그리드에 속성을 변경한다.
        <Grid
            ...
            templateColumns={{
                base: "1fr",  # base: 차크라 자체가 안드로이드를 위해 만들어졌기 때문에 base는 안드로이드 화면 크기이다.
                sm: "1fr",
                md: "1fr 1fr",
                lg: "repeat(3, 1fr)",  #  === "1fr 1fr 1fr"
                xl: "repeat(4, 1fr)",
                "2xl": "repeat(5, 1fr)",  # 일반 pc 풀화면 크기. 숫자가 들어갈경우에는 ""으로 묶어줘서 str으로 보내준다.
            }}
        >
    화면 크기가 변경될 때마다 그리드 표시가 변경된다.

    화면이 변경될때 header의 요소들이 위치가 고정되어있다. header요소들도 화면크기에 따라 속성이 변경되도록 적용한다.
        <Stack  # direction을 변경하기 위해서 VStack에서 Stack으로 변경한다. Stack은 기본 가로모드이다.
            alignItems="center"
            direction={{
                sm: "column",  # 세로로 배열
                md: "row",  # 가로
            }}
            spacing={{
                sm: 4,  #세로로 배열시 간격을 두기 위함
                lg: 0,
            }}
            ...
        >

    home에서 작성한 room코드는 room컴포넌트로 옮긴다.
    src/components/Room.tsx 생성.

    다크모드일때 텍스트 색을 일부 수정한다.
        const gray = useColorModeValue("gray.600", "gray.300");

        <Text fontSize={"sm"} color={gray}>  # "gray.600" -> gray. 다크모드일때 잘 안보인다.


    이번엔 로딩화면을 구성한다. 최근 페이스북이나 인스타그램 등 사이트에서 자주 사용되는 skelton을 사용해 본다.
    - routes/hoem -
        <Box>
            <Skeleton rounded={"2xl"} mb={8} h="260" />  # 이미지 크기와 같게 생성된다.
            <SkeletonText noOfLines={2} w={"90%"} mb={5} /> # 텍스트라인으로 생기는 뼈대이다. 기본값은 3줄이다.
            <SkeletonText noOfLines={1} w={"40%"} />
        </Box>

    room객체에 별점에 마우스를 올려놓으면 색깔이 변경되는 기능을 구현 한다.
        <HStack _hover={{ color: "red.100" }} ...>  # _를 쓰고 css에서 사용하던 에니매이션 기능을 사용할 수 있다.

    이제 API에서 데이터를 가져오는 것을 진행할 것이다.

## 19 React Query

#### [1_React]

    room url을 fetch한다.
    - src/routes/home -
        import { useEffect } from "react";

        useEffect(() => {
            fetch("http://127.0.0.1:8000/api/v2/rooms/");  # url 끝에 /를 붙여줘야한다.
        }, []);
    react 프로젝트를 실행하면 검사창에서 CORS에러가 발생한다. 서버가 사용자에게 서버로부터 무언가를 fetch하는 것을 허용하지 않는다는 것이다.

#### backend.[2_Django]

    backend셋팅을 한다. aribnb-clone-backend/info/info_0_airbnb_clone_all.md 참조
    ...
    백엔드 셋팅이 완료되면 console창에 CORS에러가 발생하지 않는다. 네트워크에서도 fetch에러가 발생하지 않아야한다.
    # #19.0 Manual Fetching_1 참조

    앞서 만든 fetch를 State에 넣는다. 로딩중인 state와 room데이터를 보여줄 state를 생성해야한다.
        const [isLoading, setIsLoading] = useState(true);
        const [rooms, setRooms] = useState();  # (): undefined
        const fetchRooms = async () => {
            const response = await fetch("http://127.0.0.1:8000/api/v2/rooms/");
            const json = await response.json();
            setRooms(json);
            setIsLoading(false);
        };
        useEffect(() => {
            fetchRooms();
        }, []);
        return (
            <Grid ...>
                {isLoading ? (
                    <>
                        <RoomSkeleton />
                        <RoomSkeleton />
                        <RoomSkeleton />
                        ...
                    </>
                ) : null}
            </Grid>
        )
    이건 예전의 fetch방식이다.
    이렇게 하나의 컴포넌트로 데이터를 fetch할 수 있지만 애플리케이션의 규모가 커지면 다른방법이 필요하다.
    그 방법은 다음에 변경하고 room데이터를 가져오겠다.
        {rooms.map((room) => (
            <Room />
        ))}
    화면변경없이 잘 나온다

    이젠 실제 데이터를 표현하도록 하겠다.
    이제 prop로 실제 데이터를 가져온다.
    - components/room -
        interface RoomProps {
            imgUrl: string;
            name: string;
            rating: number;
            ...
        }
        export default function Room({
            imgUrl,
            name,
            rating,
            ...
        }: RoomProps) {
            ...
            <Image src={imgUrl} ... />  # {}: 변수값
            ...
    데이터를 다 변경한다.
    home state에서 데이터를 보내준다.
        interface IPhoto {  # photos array 정의
            pk: number;
            file: string;
            description: string;
        }

        interface IRoom {
            pk: number;
            name: string;
            ...
            photos: IPhoto[];  # Photo interface
        }
        ...
            const [rooms, setRooms] = useState<IRoom[]>([]);
            ...
                {rooms.map((room) => (
                    <Room
                        imgUrl={rooms.photos[0]}
                        name={room.name}
                        rating={room.rating}
                        ...
                    />
                ))}

### 19.2 React Query

#### [1_React]

예전에 react query라고 불렸던 tenstack query를 설치하여 사용한다. (이름을 변경)

<https://tanstack.com/query/latest/docs/react/installation>

    $ npm i @tanstack/react-query

tanstack의 QueryClientProvider로 기존 앱을 감싸준다.
@src/index.tsx

    import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

    const client = new QueryClient();
        ...
        root.render(
            <React.StrictMode>
                <QueryClientProvider client={client}> # 앱을 감싸준다.
                    ...
                <QueryClientProvider>
            ...

react query를 사용하면 캐싱을 저장하여 다시 화면으로 돌아올때 다시 fetch를 하며 로딩이 하지않고 바로 화면을 보여준다.
api.ts를 생성하여 api를 패치하기 위한 함수를 다 옮겨준다.
@src/api.ts

    const BASE_URL = "http://127.0.0.1:8000/api/v2/";

    export async function getRooms() {  # async: 로딩중인지 확인하기위해 싱크
        const response = await fetch(`${BASE_URL}rooms/`);
        const json = await response.json();
        return json;
    }

src/routes/home의 소스를 옮겨준다.
home에 State소스와 useEffect 소스를 삭제하고 useQuery훅을 사용한다.

    import { useQuery } from "@tanstack/react-query";
    import { getRooms } from "../api";

    export default function Home() {
        # isLoading: 로딩중일 경우 true를 받음. data:json데이터. ["rooms"]: 데이터를 찾는 키, 해당 키로 값을 찾아올 수 있음.
        const { isLoading, data } = useQuery(["rooms"], getRooms);  # rooms이름 아래로 데이터들이 저장된다.
        ...
        {data.map((room) => (  # rooms -> data
            ...
        ))}

코드를 작성하면 room 타입이 지정되지않아서 요류가 발생한다.

    const { isLoading, data } = useQuery<IRoom[]>(["rooms"], getRooms);
    ...
    {data?.map((room) => (  # rooms -> data  # data?: data는 null일 수 있다. ?를 붙여준다.
        ...
    ))}

### 19.3 Axios

#### [1_React]

fetch하고 url이 확인하는 기능을 대신하여 axios를 설치한다. axios는 fetch adapter같은 거다.

    $ npm i axios

fetch대신 axios를 넣어준다.

    import axios from "axios";

    export async function getRooms() {
        const response = await axios.get(`${BASE_URL}rooms/`);
        return response.data;  # json data
    }

axios에 base url을 지정하여 관리할 수 있다.

    const instance = axios.create({
        baseURL: "http://127.0.0.1:8000/api/v2/",
    });

    export async function getRooms() {
        const response = await instance.get("rooms/");  # base_url에 더해져 url이 형성된다.
        return response.data;
    }

getRooms()를 화살표 함수로 함축해본다.

    export const getRooms = () =>
        instance.get("rooms/").then((response) => response.data);

### 19.4 Room Detail

#### [1_React]

react-router의 Link를 사용하여 room앱을 감싼다.
@src/components/room.tsx

    import { Link } from "react-router-dom";

    export default function Room(
        ...
    ) {
    return (
        <Link to={"[임의의 url]"}>
            <VStack alignItems={"flex-start"}>
                ...
            </VStack>
        </Link>

브라우져에서 room 객체를 클릭하면 not found화면으로 이동된다.
home에서 pk데이터를 room에 전달하여 url에 추가해준다.

    <Link to={`/rooms/${pk}`}>

room객체를 클릭하면 url이 해당 pk값이 포함되어 변경되는 것이 확인된다.
해당 url의 RoomDetail 페이지를 생성한다.
@src/routes/RoomDetail.tsx

    export default function RoomDetail() {
        return <h1>hello!!</h1>;
    }

@src/router

    children: [
      ... ,
      {
        path: "rooms/:roomPk",
        element: <RoomDetail />,
      },

home화면에서 room객체를 선택하면 RoomDetail화면으로 이동된다.

useParams() 훅을 사용하여 url에 있는 모든 변수를 가져온다.
@src/routes/RoomDetail

    export default function RoomDetail() {
        const params = useParams();
        console.log(params);
        ...
    }

router에서 특정 pk를 전송하면서 해당 pk로 파라미터를 가져온다.
해당 파라미터로 fetch하는 함수를 생성한다.

데이터를 가져오기 전에 backend쪽에 작업이 필요하다.
...

api.ts에 임의의 pk로 함수를 생성한다.

    export const getRoom = () =>
        instance.get(`rooms/11`).then((response) => response.data);

fetch함수로 roomdetail에서 값을 가져온다.
@routes/RoomDetail

    const {isLoading, data} = useQuery([`room:${roomPk}`], getRoom);

data변수에 backend model에 있는 데이터를 가져온다.

### 19.5 Devtools and Query Keys

tanstack의 devtool을 을 이용하여 query 변수가 어떻게 함수로 이동하는 알 수 있다.
devtool을 설치한다.

<https://tanstack.com/query/v4/docs/react/devtools>

    $ npm i @tanstack/react-query-devtools

root.tsx에 devtool을 import 한다.

    import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

    ...
        return (
            <Box>
                ...
                <ReactQueryDevtools />
            </Box>
        ...

app을 실행하면 브라우져 왼쪽 하단에 꽃모양 버튼이 생성된다. 클릭하면 캐시에 저장된 query를 확인 할 수 있다.

변수를 fetch함수로 보내는 방법을 적용해본다. room데이터를 받을때 2개의 array로 값을 받도족 적용하겠다.

    const { isLoading, data } = useQuery([`rooms`, roomPk], getRoom);

아직까지 getRoom에서 데이터를 받을 공간이 없어서 만들어 줘야한다. useQuery가 getRoom을 호출할때 매게변수를 보내준다.
@src/api.ts

    export const getRoom = (someting) =>
        ...
        console.log(someting)  // >>>: {queryKey: Array(2), pageParam: undefined, meta: undefined}
                                        queryKey: Array(2)
                                            0: "rooms"
                                            1: undefined
                                            length: 2
                                            ...

queryKey 배열에 1번에 값을 찾지 못하고 있다.
@src/router path속성값이 rooms/:room_pk로 되어 있으면서 변수명이 일치하지 않아 찾지 못했었다. roomPk로 변경.

매개변수에서 queryKey값만 가져오도록 하겠다. 인수타입은 react-query에 가져와서 사용한다. 데이터 전송에 해당 queryKey의 pk를 보내준다.

    import { QueryFunctionContext } from "@tanstack/react-query";

    export const getRoom = ({queryKey}:QueryFunctionContext) =>
        instance.get(`rooms/${queryKey[1]}`).then...

pk값을 변수에 저장하여 값의 의미를 남겨놓도록 적용하는 것이 좋다.

    const [_, roomPk] = queryKey;  // array의 길이가 2이다.
    instance.get(`rooms/${roomPk}`).then...

적용 후 브라우져에서 확인을 하면 devtools의 Data Explorer에서 데이터를 확인 할 수 있다. #19.5 Devtools and Query Keys_1 참조

### 19.6 Photos Grid

#### [2_Chakra]

타입을 정의한 파일을 따로 생성하여 모든 타입을 그 파일에 정의 하겠다. @src/type.d.ts를 생성하여 모든 type을 정의한다.

기존에 Home.tsx의 타입정의 코드를 삭제하고 type.d를 import하여 타입을 지정한다.

    import { IRoomList } from "../type";

    export default function Home() {
        ... = useQuery<IRoomList[]>...

RoomDetail에도 적용해준다.

detail화면을 구성하는데 skeleton기능도 넣어준다.

    <Skeleton h={"43px"} w={"50%"} isLoaded={!isLoading}>
        <Heading>{data?.name}</Heading>
    </Skeleton>

하단 별점, 지역 및 share, like 버튼도 생성한다.

detail화면에서 방 사진을 5개 가져온다.

    <Grid
        mt={4}
        h="60vh"
        templateRows={"1fr 1fr"}  // 탬플릿아이템이 1:1 비율로 생성
        templateColumns={"repeat(4, 1fr)"}
    >
        {data?.photos.slice(0, 5).map((photo) => (  // slice(start, end): 아이템을 일부만 가져온다.
            <Box overflow={"hidden"} key={photo.pk}>
                <Image w={"100%"} h={"100%"} src={photo.file} />  // w,h=100%: templateRows 속성에 맞게 적용하기위해 사용
            ...

detail화면에서 방 사진을 5개를 표시하는데 대표사진을 크게 하나 보여주고 오른쪽으로 남은 4개 사진을 합친 크기가 대표사진 크기와 같게 표현한다.
GridItem을 사용해준다.

    <GridItem
        colSpan={index === 0 ? 2 : 1}  // column 길이
        rowSpan={index === 0 ? 2 : 1}  // row 길이
        overflow={"hidden"}
        key={photo.pk}
    >
        <Image objectFit={"cover"} w={"100%"} h={"100%"} src={photo.file} />
    </GridItem>

사진 폼 끝부분을 rounded준다.

    <Grid
        ...
        rounded="lg"
        overflow={"hidden"}
    >

room img도 skeleton기능을 구현한다. 데이터가 들어오기전에 생성되어야하기때문에 임의 list를 만들어서 skeleton을 생성한다.

    {[0, 1, 2, 3, 4].map((index) => (
        <GridItem
            ...
            key={index}
        >
            <Skeleton h={"100%"} w={"100%"} isLoaded={!isLoading}>
                <Image
                    ...
                    src={data?.photos[index].file}
                />
            ...

### 19.7 Reviews

#### [2_Chakra]

room img 및에 방 제목과 toilet, room 개수를 표시하는 칸을 생성한다.

    <HStack mt={10}>  // 이미지는 가로정렬
        <VStack>  // 나머지 데이터는 세로 정렬
          <Heading fontSize={"2xl"}>House Hosted by {data?.owner.name}</Heading>
          <HStack justifyContent={"flex-start"} w={"100%"}>  // 속성을 사용하지 않으면 중간에서 시작한다.
            <Text>
              {data?.toilets} toilet{data?.toilets === 1 ? "" : "s"} // 두개이상일경우 "s"를 붙여준다.
            </Text>
            <Text>•</Text>
            <Text>
              {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
            </Text>
          </HStack>
        </VStack>
      </HStack>

Avatar 컴포넌트를 사용하여 avatar를 표시해준다.

    <HStack ...>
        ...
        //이미지를 로드해오지 못할 경우 name 속성을 표기해준다.
        <Avatar name={data?.owner.name} size={"xl"} src={data?.owner.avatar} />
    ...

skeleton을 구성한다. headgin과 Text를 감싸준다.

    <HStack ...>
        <VStack alignItems={"flex-start"}>
            <Skeleton h={"29px"} isLoaded={!isLoading}>
                ...
            </Skeleton>
            <Skeleton ...>
                ...

이제 이 review페이지를 위한 fetch코드를 추가한다.

@src/api. 기존 getRooom에서 reviews로 가는 것 말고는 같다.

    ...
    return instance
        .get(`rooms/${roomPk}/reviews`)
        ...
    };

@src/routes/RoomDetail

    const { isLoading: reviewsIsLoading, data: reviewsData } = useQuery(  // 이미 변수명이 있기때문에 변경
        [`rooms`, roomPk, `reviews`],
        getRoomReviews
    );

review데이터를 roomDetail 하단에 구현한다.

    <Box mt={10}>
        <Heading fontSize={"2xl"}>
            <HStack>
                <FaStar />
                <Text>{data?.rating}</Text>
            </HStack>
        </Heading>
    </Box>

reviews의 수를 표시할려고 한다. reviews.length를 사용하기 위해서는 reviews의 타입이 정의 되어야 한다.

@src/type

    export interface IReview {
        ...
    }

@src/routes/roomDetail

    ... = useQeury<IReview>(...)

### 19.8 Conclusions

Review칸을 구성해본다. 화면에 2개 리뷰 컬럼이 놓아지고 정렬되는 방식으로 구현한다.

    <Grid gap={5} templateColumns={"1fr 1fr"}>
        {reviewsData?.map((review, index) => (
            <VStack alignItems={"flex-start"} key={index}>
                ...

컬럼을 구성한다.

grid가 커서 컬럼간의 간격이 넓다. grid를 container 컴포넌트에 넣어준다.

    <Container MarginX="none">  // 가로정렬이 가운데로 되어 있다.
        <Grid ...>
        ...

## 20 Authentication

### 20.0 useUser

header에서 authentication을 알 수 있도록 구현한다. hook을 만들어서 로그인 여부를 알려주도록 하겠다.

fetcher function을 생성한다.
@src/api.ts

    export const getMe = () =>
        instance.get(`user/me`).then((response) => response.data);

src/lib 폴더를 생성한다. useUser hook을 생성해준다.

@src/lib/useUser.ts, error까지 사용해준다.

    export default function useUser() {
        const { isLoading, data, error } = useQuery(["me"], getMe);
        console.log(error);
        return;
    }

@src/components/header 에 useUser훅을 추가해준다.

    useUser()

header 컴포넌트는 어디에서든 호출이 되니 아무 페이지에서 확인 할 수 있다. #20.0 useUser_1 참조

error대신 isError를 사용하겠다. isError는 error여부에 따라 boolean값을 반환한다.

return값에 object를 반환하겠다. key와 value값이 같가면 변수명처럼 보내줄 수 있다.

    isLoading: isLoading, -> isLoading,
    user: data,
    isLoggedIn: !isError,  // isError가 false일때 에러가 없기때문에 로그인이 되었다고 판단.

Header에 user로그인이 되었다면 login sign up버튼을 안보이도록 적용한다.

        {!userLoading && !isLoggedIn ? (
          <>  // fragment. 하나의 엘리멘트만 전송이 가능해서 묶어준다.
            <Button onClick={onLoginOpen}>Log in</Button>
            <LightMode>
              <Button onClick={onSignUpOpen} colorScheme={"red"}>
                Sign up
              </Button>
            </LightMode>
          </>
        ) : (
          <Avatar />
        )}

테스트를 해보면 error가 발생하기 전까지 아바타 이모티콘이 나오다가 login버튼이 나온다. react는 기본으로 fetch를 실패해도 3번을 시도한다.
시도하는 동안 로그인버튼 대신 아바타가 보인다. 로그인 시도가 아닌 유저 데이터를 가져오는 것은 재시도를 하지 않도록 적용하기로 하겠다.

    useQuery(..., {
        retry: false,
    })

이제 바로 로그인 버튼이 나오게 된다.

로딩하는 동안 Avatar 모양이 나오지 않다록 하기 위해서 if문을 변경한다.

    {!userLoading ? (
        !isLoggedIn ? (
            <>
                ...
            </>
        ) : (
            ...
        )
    ) : null

적용 후 python서버에 로그인을 해도 로그인정보를 가져오지 못한다. 해당부분 수정을 진행하도록 하겠다.

### 20.1 Credentials

session authentication은 cookie애 의해 작동된다. 로그인을 하면 Django는 session Object를 database에 생성한다.
session은 pk와 user데이터를 갖고 있다. Django는 session pk를 cookie에 담아서 보내준다.
#20.1 Credentials_1 (cookie Session Id).png 참조

# ! 쿠키, 캐시, 세션, 로컬 스로테지

    local storage: local에 저장되는 데이터이다. 계속 저장이 된다. 용량의 제한도 없다.

    cookie: 요청한 데이터를 서버에서 보내주고 local에 저장해둔다. 쿠키는 데이터 요청시 매번 보내진다.
        수정사항이 있다면 서버에서 변경된 쿠키를 보내준다.

<https://velog.io/@ejchaid/localstorage-sessionstorage-cookie%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90>

    cashe: 웹 페이지 요소를 저장한다. 웹페이지를 빨리 렌더링하기 위해 도와준다. 오디오와 비디오 파일을 저장할 수 있다.

    session: 서버에 데이터가 저장된다. cookie는 텍스트형식, session은 object형식으로 저장된다.(db니까..)
        브라우져 종료시 데이터는 삭제 된다.

<https://hahahoho5915.tistory.com/32>

Django가 쓰는 url과 react가 쓰는 url이 다르기때문에 장고서버에서 react url로 쿠키가 전송되지 않는다. (도메인이 같지 않다.)
react페이지를 도메인을 갖게 적용을 하면 데이터를 가져올 수 없다. Django에서는 fetch가 가능한 도메인을 적용해야한다.

cookie를 준 도메인과 fetch를 진행하는 도메인이 일치해야한다.
fetch가능한 도메인을 변경해준다. -backand
...

브라우져 url창에 localhost를 대신해서 ip번호를 넣어서 검색을 한다.
Django에 설정을 추가해주면 아직 로그인을 확인하지는 못하지만 cookie에 sessionId 데이터가 추가된다.

브라우져에 의해 만들어진 요청은 자동으로 Django에 cookie를 보내준다.
react페이지는 fetch를 하여 데이터를 가져오기 때문에 javascript에 cookie를 포함시키라고 설명을 해야한다.

@src/api.ts

    const instance = axios.create({
        ... ,
        withCredentials: true,
    });

적용 후 송신 에러가 발생한다.

    Access to XMLHttpRequest at 'http://127.0.0.1:8000/api/v2/rooms/'
    from origin 'http://127.0.0.1:3000' has been blocked by CORS policy:
    The value of the 'Access-Control-Allow-Credentials' header in the
    response is '' which must be 'true' when the request's credentials
    mode is 'include'. The credentials mode of requests initiated by
    the XMLHttpRequest is controlled by the withCredentials attribute.

Django에서 credential을 받도록 적용해야한다.

...

Django 적용 후 react페이지에서 로그인확인이 가능하다.

# ! Django와 react를 사용하는 브라우져 일치시켜야함

    두 페이지를 사용하는 브라우져가 같아야 인증에 문제가 발생하지 않는다고 한다.
    내 프로젝트 작업을 진행하는 동안에는 문제가 발생하지 않았다.

### 20.3 Log Out

로그아웃 기능을 구현한다. 우선 menu, menubutton 컴포넌트로 header의 avatar을 감싸준다.

@src/components/header

    <Menu>
        <MenuButton>
            <Avatar ... />
        </MenuButton>
        <MenuList>
            <MenuItem>Log out</MenuItem>
        </MenuList>
    </Menu>

구현 후 Avatar를 클릭하면 리스트처럼 하단에 Log out이 나온다.

(Django서버 users/urls에 'log-out'이 생성되어 있다. post()로 logout기능이 구현되어 있다.)
버튼 클릭시 Django서버에 로그아웃 프로토콜을 보내면 된다.

@src/api.ts

    export const logOut = () =>
        instance.post("users/log-out").then((response) => response.data);

@src/components/header

    <MenuItem onclick={logOut}>...</MenuItem>

logOut 데이터를 담는 onLogOut()를 생성해준다.

    const onLogOut = async () => {
        const data = await logOut();
        console.log(data);
    };

로그아웃을 테스트해 본다.

# ! console에 요청 실패 오류메세지

    console에 요청 실패 오류메세지가 발생한다고 하는데 본인이 테스트를 진행하면 오류가 발생하지 않음.
    (CSRF Failed 이 발생한다고 한다.)

    오류가 발행하는 원인이 정리된 게시글이다.

<https://han-py.tistory.com/352>

다음 강의에 요청실패하는 원인과 해결을 알려준다고 하니 대기.

Toast hook을 사용하여 authentication을 알려주는 기능을 구현한다.

<https://chakra-ui.com/docs/components/toast>

    const onLogOut = async () => {
        toast({
            title: "Good bye!!",
            description: "Log out Completed.",
            status: "success",  // toast body색상, 아이콘이 변경된다.
            isClosable: true,  // 종료 아이콘이 생성된다.
            duration: 6000,  // 6초 뒤에 사라진다.
        });
    };

toast update()를 통해 toast변경이 가능하다. 임의로 딜레이 시간을 줘서 테스트를 진행한다.

    const toastId = toast({
        ...
    })

    setTimeout(() => {
        toast.update(toastId, {
            ...  // 변경될 속성들
        })
    }, 5000)

# ! MenuButton의 Avatar를 클릭시 css 경고 메세지

    MenuButton의 Avatar를 클릭시 css 경고 메세지가 발생한다.

    >>>: createPopper.js:110 Popper: CSS "margin" styles cannot be used
    to apply padding between the popper and its reference element or
    boundary. To replicate margin, use the `offset` modifier, as well
    as the `padding` option in the `preventOverflow` and `flip` modifiers.

    HStack대신에 Flex를 사용하여 해결이 가능하다.

<https://github.com/kjh910/airbnb-clone/blob/1a1db114aba436790eab8e166454ca3c8bc3a8f2/airbnb-clone-frontend/app/src/components/organisms/header/header.tsx#L67>

### 20.4 CSRF

Django는 어떠한 사이트에서든 post 요청을 신뢰하지 않으며 공격을 차단한다.
CSRF는 cross-site request forgery로써 해커가 사용하는 공격의 일종으로 해커의 사이트로부터 post요청을 보내도록 속이는 방법이다.
credential를 이용하여 정보를 훔치는 목적으로 사용된다.

CSRF 공격이란? 그리고 CSRF 방어 방법
<https://itstory.tk/entry/CSRF-%EA%B3%B5%EA%B2%A9%EC%9D%B4%EB%9E%80-%EA%B7%B8%EB%A6%AC%EA%B3%A0-CSRF-%EB%B0%A9%EC%96%B4-%EB%B0%A9%EB%B2%95>

Django에 post가능한 url을 추가해준다.

...

Django에 추가를 해주면 기존에 발생하던 오류가 변경된다. post요청을 보낼때 CSRF token을 같이 보내줘야 한다.
보안 기능이므로 보내주는 것을 구현한다.(cookie에 csrftoken이 있다.) 기능구현을 위해 js-cookie를 설치한다.

<https://www.npmjs.com/package/js-cookie>

    $ npm i js-cookie  // ! 설치 다 안됨.

사용을 위해 import를 하면 타입을 알 수 없기때문에 설치할 때 속성을 추가해달라는 ts오류가 발생한다.

    import Cookie from "js-cookie";

    >>>: Try `npm i --save-dev @types/js-cookie` if it exists or add a new declaration
    (.d.ts) file containing `declare module 'js-cookie';`

다시 설치해준다.

    $ npm i --save-dev @types/js-cookie

logOut에 token을 담아주도록 적용한다.

    export const logOut = () =>
        instance
            .post(`users/log-out`, null, {  // post두번째 자리에는 보내줄 data를 지정한다.
                // 앱은 CSRF 토큰을 획득하기 위해 헤더에 X-CSRF-Token: fetch를 포함하여야 한다.
                headers: { "X-CSRFToken": Cookie.get("csfrtoken") },
            })
            .then((response) => response.data);

<https://binchoo.tistory.com/46>

이제 로그아웃을 클릭하면 로그아웃 기능이 구현이 된다. Django admin에서도 로그아웃이 된다.
하지만 로그아웃되면서 refetch기능이 없어서 새로고침을 하지 않으면 페이지가 로그인된 상태로 계속 유지가 된다.

queryClient에는 우리가 fetch한 모든 query와 data가 있다.
query client를 사용하여 log out시 refetch기능을 구현하도록 하겠다.

@src/components/header

    const queryClient = useQueryClient();
    const onLogOut = async () => {
        const toastId = toast({
            ...
        });
        await logOut();
        // @src/lib/useUser 에 query를 생성할때 쿼리명을 me로 지정하였다.
        queryClient.refetchQueries(["me"]);  // refetch할 query명을 넣어준다.
        toast.update(toastId, {
            ...
        });
    };

# ! react 로그인화면 계속 유지

    react페이지는 로그아웃을 진행해도 페이지 변화가 발생하지 않는다. Django 페이지에 가면 로그아웃이 됨.
    로그아웃 상태에서 !isLoggedIn를 console에 출력하면 false가 나옴.
    !! 로그인이 안되어있어도 user데이터를 가져오는데 에러가 발생 안한다. 어느 유저로 로그아웃을 했든 gh의 아이디정보가 나온다.

이전에 CSRF Failed 메세지도 발생하지 않고 가져올 user 데이터도 없는데 useUser query에서 에러가 발생하지 않는다. ??
django와 react 여는 브라우져가 달라서 발생하는 오류 일까.

    브라우져의 탭을 전체 종료 후 다시 실행을 하니 유저 데이터가 나오지 않는다.
    !!! users/me에 접근할때 브라우져에서 로그인창이 뜬다. 해당 창에서 로그인했던 데이터가 계속 나온거같다.
    예전에 로그인창이 뜨길래 로그인한적이 있다. gh 아이디로 로그인을 했었다. 해당 정보가 어딘가 남아서 계속 나온듯 싶다.
    react페이지에서 로그인창이 사라지지 않고 계속 나온다. 해당부분 수정을 진행해야한다.

로그인 창은 #20.4 CSRF_1 (로그인 창) 참조.

Django에서 로그인 후 react페이지에서 log out 테스트 진행.

# ! 이제서야 CSRF오류가 발생

    테스트를 위해 Django의 CSRF_TRUSTED_ORIGINS 설정을 주석처리 했었다.
    원복진행 후 로그 아웃하니 정상 작동한다. 로그인 창은 계속 뜬다.

# 오류해결 정리

    처음 react페이지를 열었을 때 로그인 창이 떳던 이유는 Django에 settings의 설정때문이였다.
    인증 클래스에 BasicAuthentication 기능이 추가되어 있어서 로그인창이 떴다. 해당 기능을 지우면 로그인창이 뜨지 않는다.(모든 오류의 원흉)

    CSRF 오류가 발생하지 않았던 이유는 로그인창에서 등록한 유저 정보가 있어서
    Django에 user정보를 요구를 하지 않아 오류가 발생하지 않았다.

backend 유저 인증 관련 정보는 #15 Authentication 강의를 참조하자.

이제 로그아웃 기능이 정상 작동한다.

### 20.5 Github log in

깃허브 로그인 기능을 구현하겠다.

OAuth App
<https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps>

user가 github 로그인을 클릭하면 github로 이동하며 사용자의 개인정보에 접근을 동의하는지 허락을 구한다.
user가 허락한다면 github는 유저를 우리가 보내달라고 요청한 url로 토큰과 함께 보내준다.

이 토큰을 Django를 이용해 backend로 보내줘야한다. 그리고 나서 Django는 Github api에 토큰과 함께 요청을 보낸다.
토큰을 받은 Github api는 유저 정보를 보내준다. 그러면 로그인 프로세스는 마무리된다.

해당 기능을 구현하기 위해서 새로운 app를 생성한다. 하단 url에 이동하여 github app을 생성한다.
<https://github.com/settings/applications/new>

    Application name: airbnb clone
    Homepage URL: http://127.0.0.1:3000/api/v2/

    // github가 사용자 정보 제공 동의를 구한다음 redirect시키는 url이다.
    Authorization callback URL: http://127.0.0.1:3000/api/v2/social/github

app을 생성하면 app정보가 나온며 client id가 있다. <https://github.com/settings/applications/2101837>

social login 모달에 기능구현을 한다.

    <Button
        as={"a"}  // html 태그로 변환이 가능하다. anker로 변환한다.
        // anker 속성이 사용가능하다.
        href={"https://github.com/login/oauth/authorize"}  // 유저를 보내야할 url이다. github OAuth 페이지 설명 참조
        leftIcon={<FaGithub />}
        ...
    >
        Continue with Github
    </Button>

github app에 유저를 보낼때 우리의 client_id 파라미터를 같이 보내줘야한다.

    <Button
        ...
        href={"...?client_id=f61c955f466d92d1cac9"}
    >

해당 기능을 구현하면 github login버튼을 클릭하면 github 권한 허가 요청페이지로 이동한다.
#20.5 Github Log In_1 (github 정보 제공 허가).png 참조.
앱 이름과 정보를 제공할 유저의 정보가 나온다. 아직 승인을 누르면 안된다.

기본 셋팅은 공개된 정보만 가져올 수 있다.
사용자가 우리 웹에서 필요한 데이터를 비공개로 해났을 수 있으니 비공개여도 가져와야할 데이터를 정의하겠다.

    <Button
        ...
        href={"...?...&scope=read:user,user:email"}  // scope는 사용자에게 얻고 싶은 정보 목록이다.
    >

<https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps>

적용 후 github login버튼을 클릭하면 사용자에게 요구하는 데이터가 변경된다.
허용을 클릭하면 github app이 사용자를 기억하며 데이터 요구페이지는 더이상 뜨지 않는다.
다음 로그인시 바로 Authorization callback URL로 보내준다.

클릭을 하면 Authorization callback URL페이지로 이동이 되며 code파라미터도 같이 보내준다.
해당 코드가 Django에 보내야 하는 코드이다. 브라우져는 위험하니 backend로 보내는 거다.
