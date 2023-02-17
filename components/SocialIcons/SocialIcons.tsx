import { Button, ButtonProps, Group } from '@mantine/core';
import { GithubIcon, DiscordIcon, TwitterIcon } from '@mantine/ds';
import { MicrosoftButton as MicrosoftIcon } from './MicrosoftButton';

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

export function DiscordButton(props: ButtonProps) {
    return (
        <Button
            leftIcon={<DiscordIcon size={16} />}
            sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? '#5865F2' : '#5865F2',
                '&:hover': {
                    backgroundColor:
                        theme.colorScheme === 'dark'
                            ? theme.fn.lighten('#5865F2', 0.05)
                            : theme.fn.darken('#5865F2', 0.05),
                },
            })}
            {...props}
        />
    );
}

// Twitter button as anchor
export function TwitterButton(props: ButtonProps & React.ComponentPropsWithoutRef<'a'>) {
    return (
        <Button
            component="a"
            leftIcon={<TwitterIcon size={16} color="#00ACEE" />}
            variant="default"
            {...props}
        />
    );
}

export function GithubButton(props: ButtonProps) {
    return (
        <Button
            {...props}
            leftIcon={<GithubIcon size={16} />}
            sx={(theme) => ({
                backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
                color: '#fff',
                '&:hover': {
                    backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
                },
            })}
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