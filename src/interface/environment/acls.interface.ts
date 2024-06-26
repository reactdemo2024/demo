/**
 * ServiceManager.<CommandName>=<ACL1>,<ACL2>,<ACL3>,...
 * 
 * Orchestration.DriAccess=APSG\ASG_OfficeOnline\ocs_production\OcsProductionTeam
 * Orchestration.DriAccess.ADGroups=EXME\O365-GEAR-Fabric,EXME\GEARAM-Operators,PRDTRS01\OCSDeploy-Reader
 */

export interface ACLs {
    acls: string; // textarea with each line
}