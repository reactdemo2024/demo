/**
 * [Certificates]
 * Trusted root certificate files to be installed, separated by commas. Certificate files must have extension ".cer".
 * Root=RootCert.cer
 * 
 * Intermediate certifcate files to be installed, separated by commas. Certificate files must have extension ".cer".
 * CA=IntermediateCert.cer
 */

export interface Certificates {
    root: string;
    ca: string;
}