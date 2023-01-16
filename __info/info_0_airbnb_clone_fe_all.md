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
