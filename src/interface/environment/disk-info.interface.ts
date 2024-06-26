export interface DiskInfo {
    cluster?: string;
    env?: string;
    sku: string;
    layoutName: string;
}

// <Cluster>#<Env>$Disklayout_<Sku>=<LayoutName> OR Disklayout_<sku>=<LayoutName​>
/**
 * Disklayout_WCS-Wiwynn17-i20c=dedicated_stripe OR
 * Cy2test02#Autopilot$Disklayout_WCS-Wiwynn15-i22f{FPGA}=JBOD
 */