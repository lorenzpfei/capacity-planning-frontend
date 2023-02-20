import { Button, ButtonProps, Group } from '@mantine/core';
import { MicrosoftButton as MicrosoftIcon } from './MicrosoftButton';
import React from "react";

export function MicrosoftButton(props: ButtonProps) {
    return (
        <Button
            leftIcon={<MicrosoftIcon/>}
            sx={(theme) => ({
            })}
            {...props}
        />
    );
}

export function SocialButtons() {
    return (
        <Group position="center" sx={{ padding: 15 }}>
            <MicrosoftButton>Sign in with Microsoft</MicrosoftButton>
        </Group>
    );
}