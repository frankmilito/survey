import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Divider,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import SVButton from "../ui/button";
import { useTranslation } from "react-i18next";
import Demographics from "../survey/questions/filters/Demographics";

import EngagementLevels from "../survey/questions/filters/EngagmentLevels";
import PurchaseBehavior from "../survey/questions/filters/PurchaseBehavior";
import { useAppDispatch } from "@/store";
import { surveyActions } from "@/app/data/app/slices/surveySlice";

const filterSchema = z.object({
  ageRange: z.string(),
  gender: z.string(),
  country: z.string(),
  language: z.string(),
  purchaseFrequency: z.string(),
  categories: z.string(),
  averageValue: z.string(),
  emailEngagement: z.string(),
  responseHistory: z.string(),
});

const tabs = ["Demographics", "Purchase Behavior", "Engagement Levels"];

export type FilterFormValues = z.infer<typeof filterSchema>;

const FilterModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);

  const methods = useForm<FilterFormValues>({
    resolver: zodResolver(filterSchema),
  });

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  const handleNextTab = () => {
    if (tabIndex < tabs.length - 1) {
      setTabIndex(tabIndex + 1);
    } else {
      const formValues = methods.watch();
      dispatch(surveyActions.setFilters(formValues));
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <FormProvider {...methods}>
          <ModalHeader>{t("filters.filters")}</ModalHeader>
          <ModalCloseButton />
          <Divider my={{ base: 2, md: 4 }} />
          <ModalBody>
            <Tabs
              display="flex"
              align="start"
              variant="unstyled"
              index={tabIndex}
              onChange={handleTabsChange}
            >
              <TabList
                flexDirection="column"
                flex={1}
                justifyContent="start"
                alignItems={"start"}
                height="fit-content"
                borderRight="1px solid #e3e3e3"
              >
                {tabs.map((item) => (
                  <Tab
                    fontWeight="medium"
                    _selected={{
                      color: "brand.700",
                    }}
                  >
                    {item}
                  </Tab>
                ))}
              </TabList>

              <TabPanels flex={2} pl={4}>
                <TabPanel>
                  <Demographics />
                </TabPanel>
                <TabPanel>
                  <PurchaseBehavior />
                </TabPanel>
                <TabPanel>
                  <EngagementLevels />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <SVButton colorScheme="purple" onClick={handleNextTab} mt="6">
              {tabIndex < tabs.length - 1 ? "Next" : "Apply"}
            </SVButton>
          </ModalFooter>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
};

export default FilterModal;
