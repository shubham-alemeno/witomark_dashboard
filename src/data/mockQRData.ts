export interface QRData {
    id: string;
    linkedProduct: string;
    linkedPrinter: string;
    dateCreated: string;
    status?: "active" | "inactive" | "pending";
}

export interface StatsData {
    totalQRsGenerated: number;
    totalQRLimit: number;
    creditBalance: number;
}

export interface PrinterOption {
    value: string;
    label: string;
}

export interface SelectOption {
    value: string;
    label: string;
}

export const statsData: StatsData = {
    totalQRsGenerated: 11,
    totalQRLimit: 19000,
    creditBalance: 989,
};

export const qrData: QRData[] = [
    {
        id: "#11",
        linkedProduct: "-",
        linkedPrinter: "Xerox Versa 1200",
        dateCreated: "June 21, 2025, 1:11 p.m.",
        status: "active",
    },
    {
        id: "#10",
        linkedProduct: "Uprise-D3 69K Capsule #324535",
        linkedPrinter: "Xerox Versa 1200",
        dateCreated: "June 21, 2025, 1:11 p.m.",
        status: "active",
    },
    {
        id: "#9",
        linkedProduct: "Uprise-D3 69K Capsule #324535",
        linkedPrinter: "Xerox Versa 1200",
        dateCreated: "June 21, 2025, 1:11 p.m.",
        status: "active",
    },
    {
        id: "#8",
        linkedProduct: "Uprise-D3 69K Capsule #324535",
        linkedPrinter: "Xerox Versa 1200",
        dateCreated: "June 21, 2025, 1:11 p.m.",
        status: "inactive",
    },
    {
        id: "#7",
        linkedProduct: "Uprise-D3 69K Capsule #324535",
        linkedPrinter: "Xerox Versa 1200",
        dateCreated: "June 21, 2025, 1:11 p.m.",
        status: "active",
    },
    {
        id: "#6",
        linkedProduct: "Uprise-D3 69K Capsule #324535",
        linkedPrinter: "Xerox Versa 1200",
        dateCreated: "June 21, 2025, 1:11 p.m.",
        status: "pending",
    },
    {
        id: "#5",
        linkedProduct: "Uprise-D3 69K Capsule #324535",
        linkedPrinter: "Xerox Versa 1200",
        dateCreated: "June 21, 2025, 1:11 p.m.",
        status: "active",
    },
    {
        id: "#4",
        linkedProduct: "Uprise-D3 69K Capsule #324535",
        linkedPrinter: "Xerox Versa 1200",
        dateCreated: "June 21, 2025, 1:11 p.m.",
        status: "active",
    },
    {
        id: "#3",
        linkedProduct: "Uprise-D3 69K Capsule #324535",
        linkedPrinter: "Xerox Versa 1200",
        dateCreated: "June 21, 2025, 1:11 p.m.",
        status: "inactive",
    },
    {
        id: "#2",
        linkedProduct: "Uprise-D3 69K Capsule #324535",
        linkedPrinter: "Xerox Versa 1200",
        dateCreated: "June 21, 2025, 1:11 p.m.",
        status: "active",
    },
];

export const printerOptions: PrinterOption[] = [
    { value: "xerox-1200", label: "Xerox Versa 1200" },
    { value: "canon-2645", label: "Canon ImageRunner 2645i" },
    { value: "hp-400", label: "HP LaserJet Pro 400" },
    { value: "epson-4740", label: "Epson WorkForce Pro WF-4740" },
];

export const sortOptions: SelectOption[] = [
    { value: "latest", label: "Sort by: Latest first" },
    { value: "oldest", label: "Sort by: Oldest first" },
    { value: "name-asc", label: "Sort by: Product name A-Z" },
    { value: "name-desc", label: "Sort by: Product name Z-A" },
];

export const statusOptions: SelectOption[] = [
    { value: "all", label: "Status: All" },
    { value: "active", label: "Status: Active" },
    { value: "inactive", label: "Status: Inactive" },
    { value: "pending", label: "Status: Pending" },
];
