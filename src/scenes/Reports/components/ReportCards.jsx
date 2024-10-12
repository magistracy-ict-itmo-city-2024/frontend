import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Image, Text, Badge, Button, Group, Center, Skeleton, Stack } from "@mantine/core";

export const ReportCards = ({ reports, isLoading, emptyText = "" }) => {
    let navigate = useNavigate();
    const routeChange = (id) => {
        let path = `/details/${id}`;
        navigate(path);
    };

    console.log("reports", !!reports);

    // @ts-ignore
    const url = import.meta.env.VITE_BACKEND_URL;

    return reports.length ? (
        reports.map((report) => (
            <Card shadow="sm" padding="lg" radius="md" mx="xs" withBorder key={report.id} mt="md">
                <Card.Section>
                    <Center>
                        <Image
                            src={`${url}/api/v0/issues/${report.id}/downloadFile`}
                            alt="Фото обращения"
                            fallbackSrc="https://placehold.co/200x100?text=Placeholder"
                            w="auto"
                            fit="contain"
                            height="250"
                        />
                    </Center>
                </Card.Section>

                <Group justify="space-between" mt="md">
                    <Text fw={500}>Категория: {report.category}</Text>
                    <Badge color="pink" variant="light">
                        {report.status}
                    </Badge>
                </Group>

                <Text size="sm" mt="sm" mb="xs">
                    Дата обращения: {report.date}
                </Text>
                <Button fullWidth mt="md" radius="md" onClick={() => routeChange(report.id)}>
                    Подробности
                </Button>
            </Card>
        ))
    ) : isLoading ? (
        <Stack mt="md">
            <Skeleton height={180} visible={true} />
            <Skeleton height={180} visible={true} />
            <Skeleton height={180} visible={true} />
        </Stack>
    ) : (
        <Text mt="md">{emptyText || "У вас еще нет обращений"}</Text>
    );
};
