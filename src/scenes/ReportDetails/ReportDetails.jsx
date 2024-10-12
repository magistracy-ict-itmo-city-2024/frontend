import { Box, Card, Image, Text, Badge, Group, Anchor, Title } from "@mantine/core";
import React from "react";

import classes from "./ReportDetails.module.css";
import { useParams } from "react-router-dom";
import { useReport } from "./hooks";

export const ReportDetails = () => {
    let { id } = useParams();
    const report = useReport(id);

    // @ts-ignore
    const url = import.meta.env.VITE_BACKEND_URL;
    return (
        <Box maw={800} px="md" mx="auto" className={classes.details} pt="xs" mb="md">
            <Title mb="sm" order={2} ml="sm">
                Подробности обращения:
            </Title>

            {report && (
                <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    mx="xs"
                    ml="sm"
                    withBorder
                    key={report.id}
                    mt="md"
                >
                    <Card.Section>
                        <Image
                            src={`${url}/api/v0/issues/${report.id}/downloadFile`}
                            alt="Фото обращения"
                            mah="70vh"
                            fit="contain"
                            // fallbackSrc="https://placehold.co/300x200?text=Placeholder"
                        />
                    </Card.Section>
                    <Group justify="space-between" mt="md">
                        <Text fw={500}>Категория: {report.category}</Text>
                        <Badge color="pink" variant="light">
                            {report.status}
                        </Badge>
                    </Group>
                    {report.description && (
                        <Text size="sm" mt="sm">
                            Описание: {report.description}
                        </Text>
                    )}

                    {/* <Text size="sm" mt="sm">
                      Месторасположение: {report.location.lat}, {report.location.lon}
                    </Text>  */}

                    <Anchor
                        size="sm"
                        c="inherit"
                        underline="always"
                        mt="sm"
                        href={`https://www.google.com/maps/search/?api=1&query=${report.location.lat},${report.location.lon}`}
                    >
                        Посмотреть место на карте
                    </Anchor>

                    <Text size="sm" mt="sm" mb="xs">
                        Дата обращения: {report.date}
                    </Text>
                </Card>
            )}
        </Box>
    );
};
