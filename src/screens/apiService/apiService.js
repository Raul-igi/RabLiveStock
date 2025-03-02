import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiConfigs = {
  categories: "https://test.ohereza.rw/new-rab/",
  dashboardStatusCase: "https://test.ohereza.rw/new-rab/",
  addPatientCase: "https://test.ohereza.rw/new-rab/",
  healthFacilities: "https://test.ohereza.rw/new-rab/",
  patientCaseList: "https://test.ohereza.rw/new-rab/",
  caseById: "https://test.ohereza.rw/new-rab/",
  recentCases:"https://test.ohereza.rw/new-rab/",
  caseStatus:"https://test.ohereza.rw/new-rab/",
  getUserById:"https://test.ohereza.rw/new-rab/"
};

const getToken = async () => {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJjNmZmM2FlLTA3OGUtNDJmMC05NGMwLWM4MTY1NWYzNGRhYSIsImVtYWlsIjoiamF6enlicnVubzQ1QGdtYWlsLmNvbSIsInVzZXJOYW1lIjoiSmF6enkiLCJzdGF0dXMiOiJBQ1RJVkUiLCJwZXJtaXNzaW9ucyI6WyJDUkVBVEVfVVNFUiIsIlVQREFURV9VU0VSIiwiREVMRVRFX1VTRVIiLCJWSUVXX1VTRVIiLCJDUkVBVEVfUk9MRSIsIlVQREFURV9ST0xFIiwiREVMRVRFX1JPTEUiLCJDUkVBVEVfQ0FURUdPUlkiLCJVUERBVEVfQ0FURUdPUlkiLCJERUxFVEVfQ0FURUdPUlkiLCJDUkVBVEVfQ0FTRSIsIlVQREFURV9DQVNFIiwiREVMRVRFX0NBU0UiLCJVUERBVEVfQ0FTRV9TVEFUVVMiLCJBU1NJR05fQ0FURUdPUlkiLCJWSUVXX0RBU0hCT0FSRCIsIkNSRUFURV9DQVRDSE1FTlRfQVJFQSIsIlVQREFURV9DQVRDSE1FTlRfQVJFQSIsIkRFTEVURV9DQVRDSE1FTlRfQVJFQSIsIlZJRVdfSElTVE9SWSIsIkNSRUFURV9ISVNUT1JZIl0sInJvbGUiOiJTVVBFUl9BRE1JTiIsImlhdCI6MTc0MDkyMDA2NCwiZXhwIjoxNzQxMDkyODY0fQ.ueTXdobpcuTeP17-UUd8OMLSkC61cQkavfKtHqnn6nE";
};

// const getToken = async () => {
//   const token = await AsyncStorage.getItem('token')
//   return token;
// };

const createApiClient = async (apiName) => {
  if (!apiConfigs[apiName]) {
    throw new Error(`API '${apiName}' not found!`);
  }

  const token = await getToken();

  return axios.create({
    baseURL: apiConfigs[apiName],
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Include token in headers
    },
  });
};

// General API request function
const apiRequest = async (
  apiName,
  method,
  endpoint,
  data = null,
  params = null
) => {
  try {
    const apiClient = createApiClient(apiName);
    const token = getToken(); // Get the token dynamically

    const response = await apiClient({
      method,
      url: endpoint,
      data,
      params,
      headers: {
        Authorization: `Bearer ${token}`, // Attach token in every request
      },
    });

    return response.data;
  } catch (error) {
    console.error(`API Request Error [${method} ${endpoint}]:`, error.message);
    throw error;
  }
};

const fetchCategories = async () => {
  try {
    const apiClient = await createApiClient("categories"); // Wait for API client with token
    const response = await apiClient.get("/categories/all");
    return response.data.data; // Extract and return category data
  } catch (error) {
    console.error(
      "Error fetching categories:",
      error.response?.data || error.message
    );
    throw error;
  }
};


const fetchDashboardStatusCase = async (categoryId) => {
  try {
    const apiClient = await createApiClient("dashboardStatusCase");

    const response = await apiClient.get(`/dashboard/status-cases-statistics`, {
      params: { categoryId },
    });
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching dashboard status cases:",
      error.response?.data || error.message
    );
    throw error;
  }
};


const fetchQuestions = async (categoryId) => {
  try {
    if (!categoryId) return null;
    const apiClient = await createApiClient("addPatientCase");
    const response = await apiClient.get(`/categories/id/${categoryId}`);
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching category questions:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const fetchHealthFacilities = async () => {
  try {
    const apiClient = await createApiClient("healthFacilities");
    const response = await apiClient.get("/health-facilities/all");
    return response.data.data; // Extract and return category data
  } catch (error) {
    console.error(
      "Error fetching Health Facilities:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const addPatient = async (
  categoryId,
  value,
  firstName,
  lastName,
  phoneNumber,
  selectedRadioAnswers
) => {
  try {
    // Create API client with proper authentication
    const apiClient = await createApiClient("addPatientCase");
    const answersArray = Object.values(selectedRadioAnswers);

    // Prepare request payload
    const requestData = {
      categoryId: categoryId,
      casePersonalInfo: {
        firstName: firstName,
        lastName: lastName,
        phone: phoneNumber,
      },
      screenerPersonalInfo: {
        firstName: firstName,
        lastName: lastName,
        phone: phoneNumber,
      },

      healthCenterId: value.value,
      answers: answersArray,
      // notifications: {
      //   statusId: "string",
      //   params: [
      //     {
      //       name: "recipientName",
      //       value: "John Doe",
      //     },
      //     {
      //       name: "facility",
      //       value: "Kigali",
      //     },
      //   ],
      // },
    };
    // Send POST request to the backend
    const response = await apiClient.post("/case/create", requestData);

    return response.data; // Return response from API
  } catch (error) {
    console.error(
      "Error adding patient:",
      error.response?.data || error.message
    );
    throw error;
  }
};





const dertermineStatus = async (
  categoryId,
  value,
  firstName,
  lastName,
  phoneNumber,
  selectedRadioAnswers
) => {
  try {
    // Create API client with proper authentication
    const apiClient = await createApiClient("caseStatus");
    const answersArray = Object.values(selectedRadioAnswers);

    // Prepare request payload
    const requestData = {
      categoryId: categoryId,
      casePersonalInfo: {
        firstName: firstName,
        lastName: lastName,
        phone: phoneNumber,
      },
      screenerPersonalInfo: {
        firstName: firstName,
        lastName: lastName,
        phone: phoneNumber,
      },

      healthCenterId: value.value,
      answers: answersArray,
      // notifications: {
      //   statusId: "string",
      //   params: [
      //     {
      //       name: "recipientName",
      //       value: "John Doe",
      //     },
      //     {
      //       name: "facility",
      //       value: "Kigali",
      //     },
      //   ],
      // },
    };
    // Send POST request to the backend
    const response = await apiClient.post("/case/determine-status", requestData);

    return response.data; // Return response from API
  } catch (error) {
    console.error(
      "Error dertermine case staus:",
      error.response?.data || error.message
    );
    throw error;
  }
};










const fetchRecentCases = async () => {
  try {
    const apiClient = await createApiClient("recentCases");
    const response = await apiClient.get(
      "/case/all?limit=5&page=1&includeHealthFacility=true&categoryId=9e5497a3-342e-4751-845c-ac34967d4742&includeStatuses=true&includeCasePersonalInfo=true"
    );
    //console.log("Full API Response:", response.data);
    return response.data.data; // Extract and return category data
  } catch (error) {
    console.error(
      "Error fetching recent cases:",
      error.response?.data || error.message
    );
    throw error;
  }
};






const fetchPatientCaseList = async () => {
  try {
    const apiClient = await createApiClient("patientCaseList");
    const response = await apiClient.get(
      "case/all?includeCasePersonalInfo=true"

    );
    //console.log("Full API Response:", response.data);
    return response.data.data; // Extract and return category data
  } catch (error) {
    console.error(
      "Error fetching suspect list:",
      error.response?.data || error.message
    );
    throw error;
  }
};










const fetchCaseById = async (caseId) => {
  try {
    const apiClient = await createApiClient("caseById");
    //console.log(caseId);
    const response = await apiClient.get(`case/${caseId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching case:",
      error.response?.data || error.message
    );
  }
};



const fetchUserById = async (id) => {
  try {
    if (!id) return null;
    const apiClient = await createApiClient("getUserById");
    const response = await apiClient.get(`/users/id/${id}`);
    console.log("response fetched:", response.data)
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching user by id:",
      error.response?.data || error.message
    );
    throw error;
  }
};





const apiService = {
  get: (apiName, endpoint, params) =>
    apiRequest(apiName, "GET", endpoint, null, params),
  post: (apiName, endpoint, data) =>
    apiRequest(apiName, "POST", endpoint, data),
  put: (apiName, endpoint, data) => apiRequest(apiName, "PUT", endpoint, data),
  delete: (apiName, endpoint) => apiRequest(apiName, "DELETE", endpoint),
  fetchCategories,
  fetchDashboardStatusCase,
  fetchQuestions,
  fetchHealthFacilities,
  addPatient,
  fetchPatientCaseList,
  fetchRecentCases,
  fetchCaseById,
  dertermineStatus,
  fetchUserById
};

export default apiService;
