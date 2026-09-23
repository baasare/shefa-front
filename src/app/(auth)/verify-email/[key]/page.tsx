import {EmailConfirmation} from '@/components/features/auth/EmailConfirmation';
export default function VerifyEmailKeyPage({params}: {params: {key: string}}) {
    return <EmailConfirmation confirmationKey={params.key} />;
}
