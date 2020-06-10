import { AxiosInstance } from 'axios';
import { MetaLinkProps, MetaSysProps, DefaultElements } from '../common-types';
export declare type OrganizationInvitationProps = {
    sys: MetaSysProps & {
        organizationMembership: {
            sys: MetaLinkProps;
        };
        user: Record<string, any> | null;
        invitationUrl: string;
        status: string;
    };
    firstName: string;
    lastName: string;
    email: string;
    role: string;
};
export interface OrganizationInvitation extends OrganizationInvitationProps, DefaultElements<OrganizationInvitationProps> {
}
/**
 * @private
 * @param http - HTTP client instance
 * @param data - Raw invitation data
 * @return {OrganizationInvitation} Wrapped Inviation data
 */
export declare function wrapOrganizationInvitation(http: AxiosInstance, data: OrganizationInvitationProps): OrganizationInvitationProps & {
    toPlainObject(): OrganizationInvitationProps;
};