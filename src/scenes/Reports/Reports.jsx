import React from "react";
import { Box, Title, Tabs, rem } from "@mantine/core";
import {
    IconMailOpenedFilled,
    IconCircleX,
    IconProgress,
    IconCircleCheck,
} from "@tabler/icons-react";

import { useMyReports } from "./hooks";
import classes from "./Reports.module.css";
import { ReportCards } from "./components";

const iconStyle = { width: rem(12), height: rem(12) };

export const Reports = () => {
    const { groupedReports, isLoading } = useMyReports();

    return (
        <Box maw={800} px="md" mx="auto" className={classes.reports} pt="xs" mb="md">
            <Title mb="sm" order={2}>
                Мои обращения:
            </Title>

            <Tabs variant="pills" defaultValue="Открыт">
                <Tabs.List>
                    <Tabs.Tab
                        value="Открыт"
                        leftSection={<IconMailOpenedFilled style={iconStyle} />}
                    >
                        Открытые {`(${groupedReports?.["Открыт"]?.length ?? 0})`}
                    </Tabs.Tab>
                    <Tabs.Tab value="Закрыт" leftSection={<IconCircleX style={iconStyle} />}>
                        Закрытые {`(${groupedReports?.["Закрыт"]?.length ?? 0})`}
                    </Tabs.Tab>
                    <Tabs.Tab value="В процессе" leftSection={<IconProgress style={iconStyle} />}>
                        В процессе {`(${groupedReports?.["В процессе"]?.length ?? 0})`}
                    </Tabs.Tab>
                    <Tabs.Tab value="Разрешен" leftSection={<IconCircleCheck style={iconStyle} />}>
                        Разрешенные {`(${groupedReports?.["Разрешен"]?.length ?? 0})`}
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="Открыт">
                    <ReportCards
                        reports={groupedReports["Открыт"] ?? []}
                        isLoading={isLoading}
                        emptyText="У вас нет открытых обращений"
                    />
                </Tabs.Panel>

                <Tabs.Panel value="Закрыт">
                    <ReportCards
                        reports={groupedReports["Закрыт"] ?? []}
                        isLoading={isLoading}
                        emptyText="У вас нет закрытых обращений"
                    />
                </Tabs.Panel>

                <Tabs.Panel value="В процессе">
                    <ReportCards
                        reports={groupedReports["В процессе"] ?? []}
                        isLoading={isLoading}
                        emptyText="У вас нет обращений в процессе"
                    />
                </Tabs.Panel>
                <Tabs.Panel value="Разрешен">
                    <ReportCards
                        reports={groupedReports["Разрешен"] ?? []}
                        isLoading={isLoading}
                        emptyText="У вас нет разрешенных обращений"
                    />
                </Tabs.Panel>
            </Tabs>
        </Box>
    );
};
