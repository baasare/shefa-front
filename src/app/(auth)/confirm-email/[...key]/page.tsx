import {EmailConfirmation} from '@/components/features/auth/EmailConfirmation';
export default function ConfirmEmailPage({params}: {params: {key: string[]}}) {
    return <EmailConfirmation confirmationKey={params.key.join(':')} />;
}
