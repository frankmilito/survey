import { appActions, selectors } from "@/app/data/app/slices/slice";
import { router } from "@/app/routes";
import { persistor, useAppDispatch, useAppSelector } from "@/store";
import {
  Box,
  Flex,
  Text,
  Spacer,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  HStack,
  Image,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { LuChevronsUpDown } from "react-icons/lu";
import { TbSettings, TbBell } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";

const navList = [
  "Dashboard",
  "Question Bank",
  "Results",
  "Customers",
  "Integrations",
  "Account",
  "Users",
];
function Navbar() {
  const [t] = useTranslation();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const activePath = pathname.replace("/", "");
  const userDetails = useAppSelector(selectors.selectUserDetails);

  const handleLogout = () => {
    dispatch(appActions.logout());
    persistor.purge();
    router.navigate("/login");
  };

  return (
    <Box shadow="sm" borderBottom="1px solid #E2E8F0" py={4} px={6}>
      <Flex alignItems="center">
        <HStack spacing={2}>
          <Image src={"/name-logo.svg"} alt="app logo" height="30px" />
        </HStack>

        <HStack spacing={8} ml={8} display={{ base: "none", md: "flex" }}>
          {navList.map((nav) => {
            const isActive = activePath === nav.toLowerCase();
            return (
              <Link to={`/${nav.toLowerCase()}`} key={nav}>
                <Text
                  color={isActive ? "brand.700" : "primary.500"}
                  cursor="pointer"
                  fontWeight="medium"
                  transition="all .2s ease-in-out"
                  _hover={{
                    color: "brand.700",
                  }}
                  key={nav}
                >
                  {nav}
                </Text>
              </Link>
            );
          })}
        </HStack>

        <Spacer />

        <HStack spacing={4}>
          <IconButton
            aria-label="Settings"
            variant="ghost"
            size="lg"
            color="primary.500"
          >
            <TbSettings />
          </IconButton>
          <Box position="relative">
            <IconButton
              aria-label="Notifications"
              size="lg"
              variant="ghost"
              color="primary.500"
            >
              <TbBell />
            </IconButton>
          </Box>
          <Menu>
            <MenuButton>
              <HStack>
                <Avatar
                  size="sm"
                  name={userDetails?.name}
                  src="https://bit.ly/broken-link"
                />
                <Text fontSize="md" color="primary.900" fontWeight="medium">
                  {userDetails?.name}
                </Text>
                <IconButton
                  icon={<LuChevronsUpDown />}
                  aria-label="Settings"
                  variant="ghost"
                  size="lg"
                />
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem>{t("common.profile")}</MenuItem>
              <MenuItem>{t("common.notifications")}</MenuItem>
              <MenuItem>{t("common.settings")}</MenuItem>
              <MenuItem onClick={handleLogout}>{t("common.logout")}</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
}

export default Navbar;
